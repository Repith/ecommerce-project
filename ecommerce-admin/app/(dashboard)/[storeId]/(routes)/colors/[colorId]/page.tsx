import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({
  params,
}: {
  params: { colorId: string };
}) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <ColorForm initialData={color} />
      </section>
    </main>
  );
};

export default ColorPage;
