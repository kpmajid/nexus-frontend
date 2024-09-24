import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

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

import ProjectEdit from "@/components/Project/ProjectEdit";
import ProjectDelete from "@/components/Project/ProjectDelete";

const Overview = () => {
  const navigate = useNavigate();

  const { project, role } = useSelector(
    (state: RootState) => state.projectDetails
  );

  if (!project) {
    navigate("/projects");
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
        {role == "teamLead" && (
          <div className="flex space-x-2">
            <ProjectEdit />
            <ProjectDelete />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div className="flex flex-col items-start gap-y-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium mb-1">Team Lead</span>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    className="w-full h-full object-cover"
                    src={project.teamLead.avatar}
                    alt={project.teamLead.name}
                  />
                  <AvatarFallback>
                    {project.teamLead.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {project.teamLead.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.teamLead.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium mb-1">Team Members</span>
              <div>
                {project.teamMembers.length > 0 ? (
                  project.teamMembers.map((member: TeamMember) => (
                    <Avatar key={member?._id}>
                      <AvatarImage
                        className="w-full h-full object-cover"
                        src={member.avatar}
                      />
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No team members</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="text-sm font-medium">Start Date</span>
              <p className="text-sm">{formatDate(project.startDate)}</p>
            </div>
            <div>
              <span className="text-sm font-medium">End Date</span>
              <p className="text-sm">{formatDate(project.endDate)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Overview;
