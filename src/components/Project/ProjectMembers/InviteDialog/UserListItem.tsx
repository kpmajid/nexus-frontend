import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

interface UserListItemProps {
  user: User;
  onSelect: (user: User) => void;
}

const UserListItem: React.FC<UserListItemProps> = memo(({ user, onSelect }) => (
  <div className="flex items-center justify-between py-2 px-4 hover:bg-accent rounded-md transition-colors">
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium leading-none text-foreground antialiased">
          {user.name}
        </span>
        <span className="text-xs text-muted-foreground mt-1 antialiased">
          {user.email}
        </span>
      </div>
    </div>
    <Button variant="ghost" size="sm" onClick={() => onSelect(user)}>
      Select
    </Button>
  </div>
));

export default UserListItem;
