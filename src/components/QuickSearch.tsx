import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchIcon } from "lucide-react";

const QuickSearch = () => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className=" bg-[#FF0080] hover:bg-[#FF0080] h-12 w-12 hover:shadow hover:shadow-[#ff0080] p-2 fixed bottom-8 z-20 right-4 rounded-full"
            >
              <SearchIcon className="w-10 h-10 text-emerald-50" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Quick Search</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default QuickSearch;
