import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MemberSearch from "./MemberSearch";
import MemberItem from "./MemberItem";
import InviteDialog from "./InviteDialog";
import InvitationItem from "./InvitationItem";

import { TeamMember, Invitation } from "./Types";
import { User } from "@/types/types";

export default function ProjectMembers() {
  const { project, role: userRole } = useSelector(
    (state: RootState) => state.projectDetails
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  if (!project) return null;

  const allMembers: TeamMember[] = [
    { ...project.teamLead, role: "teamLead" as const },
    ...project.teamMembers.map((member) => ({
      ...(member as User),
      role: "teamMember" as const,
    })),
  ];

  // Mock invitations data (fetch it from database?)
  const invitations: Invitation[] = [
    { _id: "inv1", email: "pending@example.com", status: "Pending" },
    { _id: "inv2", email: "accepted@example.com", status: "Accepted" },
    { _id: "inv3", email: "declined@example.com", status: "Declined" },
  ];

  const filteredMembers = allMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === "all" || member.role.toLowerCase() === roleFilter)
  );

  const isAdmin = userRole === "teamLead";

  const handleRemoveMember = (memberId: string) => {
    // Here you would typically send a request to the backend to remove the member
    console.log(`Removing member ${memberId}`);
  };

  const handleCancelInvitation = (invitationId: string) => {
    // Here you would typically send a request to the backend to cancel the invitation
    console.log(`Cancelling invitation ${invitationId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card className="w-full bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-muted/50 border-b">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              Project Members
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your project team
            </p>
          </div>
          {isAdmin && <InviteDialog />}
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="members">Members</TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="invitations">Invitations</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="members">
              <MemberSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
              />
              <ScrollArea className="h-[calc(100vh-24rem)]">
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <MemberItem
                      key={member._id}
                      member={member}
                      isAdmin={isAdmin}
                      onRemove={handleRemoveMember}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            {isAdmin && (
              <TabsContent value="invitations">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-4">
                    {invitations.map((invitation) => (
                      <InvitationItem
                        key={invitation._id}
                        invitation={invitation}
                        onCancel={handleCancelInvitation}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
