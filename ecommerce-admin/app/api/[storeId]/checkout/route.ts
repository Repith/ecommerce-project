import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

interface RequestBody {
  productVariants: {
    variantId: string;
    productId: string;
  }[];
  quantities: number[];
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization",
  proxy: "baseUrlForTheAPI",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productVariants, quantities } =
    (await req.json()) as RequestBody;

  if (!productVariants || productVariants.length === 0) {
    return new NextResponse(
      "Product and Variant IDs are required",
      {
        status: 400,
      }
    );
  }

  if (
    !quantities ||
    quantities.length !== productVariants.length
  ) {
    return new NextResponse(
      "Mismatch in productVariant pairs and quantities",
      {
        status: 400,
      }
    );
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    [];

  try {
    const orderItems = productVariants.map((pv, index) => {
      const quantity = quantities[index];

      if (quantity === undefined) {
        throw new Error(
          `Quantity is undefined for productVariant at index ${index}`
        );
      }

      return {
        product: {
          connect: {
            id: pv.productId,
          },
        },
        variant: {
          connect: {
            id: pv.variantId,
          },
        },
        quantity,
      };
    });

    if (orderItems.length === 0) {
      throw new Error("No products available.");
    }

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: orderItems,
        },
      },
    });

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

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
