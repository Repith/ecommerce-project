import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
      variants,
      isFeatured,
      isArchived,
      description,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
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

    if (!params.storeId) {
      return new NextResponse("Store id is required", {
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        storeId: params.storeId,
        description,
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
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId =
      searchParams.get("categoryId") || undefined;
    const name = searchParams.get("name") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    const colorId =
      searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;

    if (!params.storeId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        name: name ? { contains: name } : undefined,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        variants: {
          some: {
            colorId: colorId,
            sizeId: sizeId,
          },
        },
      },
      include: {
        images: true,
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
