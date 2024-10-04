import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { X } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

interface SelectedUserItemProps {
  user: User;
  onRemove: (id: string) => void;
}

const SelectedUserItem: React.FC<SelectedUserItemProps> = memo(
  ({ user, onRemove }) => (
    <div className="flex items-center justify-between py-2 px-4 bg-accent rounded-md">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none text-foreground antialiased">
            {user.name}
          </span>
          <span className="text-xs text-muted-foreground mt-1  antialiased">
            {user.email}
          </span>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={() => onRemove(user._id)}>
        <X className="h-4 w-4" />
        <span className="sr-only">Remove {user.name}</span>
      </Button>
    </div>
  )
);

export default SelectedUserItem;
