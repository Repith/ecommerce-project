import prismadb from "@/lib/prismadb";

export const getRecentOrders = async (storeId: string) => {
  const recentOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return recentOrders;
};
