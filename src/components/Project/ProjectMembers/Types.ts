import { User } from "@/types/types";

export interface TeamMember extends User {
  role: "teamLead" | "teamMember";
};

export type Invitation = {
  _id: string;
  email: string;
  status: "Pending" | "Accepted" | "Declined";
};

export type BadgeVariant = "default" | "destructive" | "outline" | "secondary";
