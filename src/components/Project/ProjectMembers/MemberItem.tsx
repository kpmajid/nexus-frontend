import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, XIcon } from "lucide-react";
import { TeamMember } from "./Types";

type MemberItemProps = {
  member: TeamMember;
  isAdmin: boolean;
  onRemove: (memberId: string) => void;
};

const MemberItem: React.FC<MemberItemProps> = ({
  member,
  isAdmin,
  onRemove,
}) => {
  return (
    <div
      key={member._id}
      className="flex items-center justify-between space-x-4 bg-accent/10 p-4 rounded-lg"
    >
      <div className="flex items-center space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{member.name}</p>
          <p className="text-xs text-muted-foreground">{member.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge
          variant={member.role === "teamLead" ? "default" : "secondary"}
          className="h-7 px-2 flex items-center"
        >
          {member.role}
        </Badge>
        <Link to={`/chat/${member._id}`}>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <MessageSquareIcon className="h-4 w-4" />
          </Button>
        </Link>
        {isAdmin && member.role !== "teamLead" && (
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onRemove(member._id)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemberItem;
