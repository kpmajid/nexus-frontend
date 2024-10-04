import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Invitation, BadgeVariant } from "./Types";

type InvitationItemProps = {
  invitation: Invitation;
  onCancel: (invitationId: string) => void;
};

const getInvitationBadgeVariant = (
  status: Invitation["status"]
): BadgeVariant => {
  switch (status) {
    case "Pending":
      return "default";
    case "Accepted":
      return "secondary";
    case "Declined":
      return "destructive";
    default:
      return "default";
  }
};

const InvitationItem: React.FC<InvitationItemProps> = ({
  invitation,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between space-x-4 bg-accent/10 p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarFallback>
            {invitation.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{invitation.email}</p>
          <Badge
            variant={getInvitationBadgeVariant(invitation.status)}
            className="mt-1"
          >
            {invitation.status}
          </Badge>
        </div>
      </div>
      {invitation.status === "Pending" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCancel(invitation._id)}
        >
          Cancel Invitation
        </Button>
      )}
    </div>
  );
};

export default InvitationItem;
