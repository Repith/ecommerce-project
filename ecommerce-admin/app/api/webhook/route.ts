import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import prismadb from "@/lib/prismadb"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  console.log('Address constructed:', addressString); // Log 4

  if (event.type === "checkout.session.completed") {
    try {
      const order = await prismadb.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || '',
        },
        include: {
          orderItems: true,
        }
      });

      const productUpdates = order.orderItems.map(async (orderItem) => {
        const product = await prismadb.product.findUnique({ where: { id: orderItem.productId } });
        if (!product) {
          throw new Error(`Product with id ${orderItem.productId} not found.`);
        }

        if (product.inStock < orderItem.quantity) {
          throw new Error(`Not enough ${product.name} in stock.`);
        }

        const updatedProduct = await prismadb.product.update({
          where: { id: product.id },
          data: {
            inStock: product.inStock - orderItem.quantity,
            isArchived: product.inStock - orderItem.quantity === 0
          }
        });

        return updatedProduct;
      });

      await Promise.all(productUpdates);
    } catch (error: any) {
    }
  }
  return new NextResponse(null, { status: 200 });
}
