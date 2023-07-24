import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  'proxy':'baseUrlForTheAPI'
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  console.log('1: Checkout POST request has been invoked');

  const { productIds, quantities } = await req.json();

  console.log('2: Received product IDs and quantities:', productIds, quantities);

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  if (!quantities || quantities.length !== productIds.length) {
    return new NextResponse("Mismatch in productIds and quantities", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  console.log('3: Found products in database:', products);

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  
  try {
    products.forEach((product, index) => {
      if (product.inStock < quantities[index]) {
        throw new Error(`Not enough ${product.name} in stock.`);
      }

      line_items.push({
        quantity: quantities[index],
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price.toNumber() * 100
        }
      });
    });

    if (line_items.length === 0) {
      throw new Error("No products available.");
    }

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string, index: number) => ({ 
            product: {
              connect: {
                id: productId
              }
            },
            quantity: quantities[index],
          }))
        }
      }
    });

    console.log('4: Order has been successfully created:', order);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id
      },
    });

    console.log('5: Checkout session has been successfully created:', session);

    return NextResponse.json({ url: session.url }, {
      headers: corsHeaders
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
