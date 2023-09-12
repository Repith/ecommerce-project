import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get(
    "Stripe-Signature"
  ) as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(
      `Webhook Error: ${error.message}`,
      { status: 400 }
    );
  }

  const session = event.data
    .object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents
    .filter((c) => c !== null)
    .join(", ");

  if (event.type === "checkout.session.completed") {
    try {
      const order = await prismadb.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || "",
        },
        include: {
          orderItems: true,
        },
      });

      const variantUpdates = order.orderItems.map(
        async (orderItem) => {
          const variant = await prismadb.variant.findUnique(
            {
              where: { id: orderItem.variantId },
            }
          );

          if (!variant) {
            throw new Error(
              `Variant with id ${orderItem.variantId} not found.`
            );
          }

          if (variant.inStock < orderItem.quantity) {
            throw new Error(
              `Not enough items in stock for variant id ${orderItem.variantId}.`
            );
          }

          const updatedVariant =
            await prismadb.variant.update({
              where: { id: variant.id },
              data: {
                inStock:
                  variant.inStock - orderItem.quantity,
              },
            });

          return updatedVariant;
        }
      );

      await Promise.all(variantUpdates);
    } catch (error: any) {
      console.error("Error in checkout session:", error);
    }
  }

  return new NextResponse(null, { status: 200 });
}
