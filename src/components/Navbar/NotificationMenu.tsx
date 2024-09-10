import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NotificationMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <BellIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4"></div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default NotificationMenu;
