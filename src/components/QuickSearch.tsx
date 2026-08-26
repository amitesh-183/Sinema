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
              className="bg-[#FF0080] hover:bg-[#FF0080] h-11 w-11 hover:shadow hover:shadow-[#ff0080] p-2 fixed bottom-6 z-20 right-4 rounded-full sm:bottom-8 sm:h-12 sm:w-12"
            >
              <SearchIcon className="h-5 w-5 text-emerald-50" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Quick Search</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default QuickSearch;
