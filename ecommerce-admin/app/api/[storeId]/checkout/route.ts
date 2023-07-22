import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  const quantities = productIds.map((item) => item.quantity);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((item) => item.productId),
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product, index) => {
    const quantity = quantities[index];
    if (quantity <= 0) {
      throw new Error(`Invalid quantity for product "${product.name}"`);
    }

    line_items.push({
      quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });

  let order;
  try {
    await prisma.$transaction(async (prisma) => {
      order = await prisma.order.create({
        data: {
          storeId: params.storeId,
          isPaid: false,
          orderItems: {
            create: productIds.map((item) => ({
              product: {
                connect: {
                  id: item.productId,
                },
              },
              quantity: item.quantity,
            })),
          },
        },
      });

      const productIdsToUpdate = productIds.map((item) => item.productId);
      const productsToUpdate = await prisma.product.findMany({
        where: {
          id: {
            in: productIdsToUpdate,
          },
        },
      });

      for (const productToUpdate of productsToUpdate) {
        const orderedQuantity =
          productIds.find((item) => item.productId === productToUpdate.id)
            ?.quantity || 0;

        await prisma.product.update({
          where: {
            id: productToUpdate.id,
          },
          data: {
            isArchived: true,
            inStock: productToUpdate.inStock - orderedQuantity,
          },
        });
      }
    });
  } catch (error) {
    return new NextResponse(`Error processing order: ${error.message}`, {
      status: 500,
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
