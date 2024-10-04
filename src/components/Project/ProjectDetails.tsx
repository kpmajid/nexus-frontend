import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users2Icon,InfoIcon } from "lucide-react";

import ProjectEdit from "@/components/Project/ProjectEdit";
import ProjectDelete from "@/components/Project/ProjectDelete";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

type TeamMember = {
  _id?: string;
  avatar: string;
  name?: string;
};

const ProjectDetails = () => {
  const { project, role } = useSelector(
    (state: RootState) => state.projectDetails
  );

  if (!project) return null;

  return (
    <Card className="w-full h-full overflow-hidden bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-muted/50">
        <div>
          <CardTitle className="text-2xl font-bold text-primary">
            {project.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Project Overview</p>
        </div>
        {role === "teamLead" && (
          <div className="flex space-x-2">
            <ProjectEdit />
            <ProjectDelete />
          </div>
        )}
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center">
            <InfoIcon className="w-5 h-5 mr-2 text-primary" />
            Description
          </h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-4 bg-accent/10 p-4 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">{formatDate(project.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-accent/10 p-4 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">{formatDate(project.endDate)}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Users2Icon className="w-5 h-5 mr-2 text-primary" />
            Team
          </h3>
          <div className="flex items-center space-x-4 bg-accent/10 p-4 rounded-lg">
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarImage src={project.teamLead.avatar} alt={project.teamLead.name} />
              <AvatarFallback>{project.teamLead.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{project.teamLead.name}</p>
              <p className="text-xs text-muted-foreground">{project.teamLead.email}</p>
              <Badge variant="secondary" className="mt-1">Team Lead</Badge>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.teamMembers.map((member: TeamMember) => (
              <div key={member._id} className="flex items-center space-x-3 bg-accent/10 p-3 rounded-lg">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name?.charAt(0) || 'TM'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <Badge variant="outline" className="mt-1">Member</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;
