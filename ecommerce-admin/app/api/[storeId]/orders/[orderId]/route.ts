import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Order ID is required", {
        status: 400,
      });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId,
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { orderId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { isPaid, isSent, phone, address, orderItems } =
      body;

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (isPaid === undefined) {
      return new NextResponse("Payment check is required", {
        status: 400,
      });
    }

    if (phone && !phone) {
      return new NextResponse("Phone number is required", {
        status: 400,
      });
    }

    if (address && !address) {
      return new NextResponse("Address is required", {
        status: 400,
      });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 405,
      });
    }

    const updateData = {
      isSent,
      isPaid,
      ...(phone && { phone }),
      ...(address && { address }),
    };

    if (orderItems) {
      if (!orderItems.length) {
        return new NextResponse(
          "Need at least 1 order of a product",
          {
            status: 400,
          }
        );
      }

      updateData.orderItems = {
        deleteMany: {},
        createMany: orderItems.map(
          (orderItem: {
            quantity: number;
            variant: string;
            product: string;
          }) => orderItem
        ),
      };
    }

    const order = await prismadb.order.update({
      where: {
        id: params.orderId,
      },
      data: updateData,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { orderId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.orderId) {
      return new NextResponse("Order ID is required", {
        status: 400,
      });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 405,
      });
    }

    await prismadb.orderItem.deleteMany({
      where: {
        orderId: params.orderId,
      },
    });

    const order = await prismadb.order.delete({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
