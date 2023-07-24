import { cn } from "@/lib/utils";
import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
  additionalProps?: string;
}

const Billboard: React.FC<BillboardProps> = ({ data, additionalProps }) => {
  return (
    <div className="p-4 overflow-hidden sm:p-6 rounded-xl">
      <div
        className={cn(
          "rounded-xl relative aspect-[3/1] overflow-hidden bg-cover",
          additionalProps
        )}
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
          <div className="max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
