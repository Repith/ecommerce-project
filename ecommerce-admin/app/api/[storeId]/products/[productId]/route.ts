import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required", {
        status: 400,
      });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        variants: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = (await req.json()) as {
      name: string;
      price: number;
      categoryId: string;
      images: { url: string }[];
      isFeatured: boolean;
      isArchived: boolean;
      description: string;
      variants: {
        inStock: number;
        sizeId: string;
        colorId: string;
      }[];
    };

    const {
      name,
      price,
      categoryId,
      images,
      isFeatured,
      isArchived,
      description,
      variants,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", {
        status: 400,
      });
    }

    if (!price) {
      return new NextResponse("Price is required", {
        status: 400,
      });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse("Description is required", {
        status: 400,
      });
    }

    if (!variants) {
      return new NextResponse(
        "Need at least 1 variant of a product",
        { status: 400 }
      );
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        description,
        variants: {
          deleteMany: {},
        },
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        variants: {
          createMany: {
            data: [
              ...variants.map(
                (variant: {
                  inStock: number;
                  sizeId: string;
                  colorId: string;
                }) => variant
              ),
            ],
          },
        },
        images: {
          createMany: {
            data: [
              ...images.map(
                (image: { url: string }) => image
              ),
            ],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", {
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
