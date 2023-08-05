import { cn } from "@/lib/utils";
import { Billboard } from "@/types";
import ColorEffect from "./ui/color-effect";

interface BillboardProps {
  data?: Billboard;
  additionalProps?: string;
  rounded: string;
}

const Billboard: React.FC<BillboardProps> = ({
  data,
  additionalProps,
  rounded,
}) => {
  return (
    <section className={cn("overflow-hidden shadow-md", rounded)}>
      <div
        className={cn(
          "relative aspect-[3/1] overflow-hidden bg-cover",
          additionalProps
        )}
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
          <div className="max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl">
            <ColorEffect>{data?.label}</ColorEffect>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Billboard;
