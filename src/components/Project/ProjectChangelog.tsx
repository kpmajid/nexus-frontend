import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquareIcon, CheckSquareIcon, HistoryIcon } from "lucide-react";

type ChangelogItem = {
  id: string;
  type: "task" | "comment";
  description: string;
  date: string;
};

// This is a mock data. In a real application, you would fetch this data from your backend.
const changelogItems: ChangelogItem[] = [
  {
    id: "1",
    type: "task",
    description: 'New task "Implement user authentication" added',
    date: "2023-06-01T10:00:00Z",
  },
  {
    id: "2",
    type: "comment",
    description: 'John Doe commented on task "Design homepage"',
    date: "2023-06-02T14:30:00Z",
  },
  {
    id: "3",
    type: "task",
    description: 'Task "Create API documentation" completed',
    date: "2023-06-03T09:15:00Z",
  },
  {
    id: "4",
    type: "task",
    description: 'New task "Optimize database queries" added',
    date: "2023-06-04T11:45:00Z",
  },
  {
    id: "5",
    type: "comment",
    description: 'Jane Smith commented on task "Implement user authentication"',
    date: "2023-06-05T16:20:00Z",
  },
  {
    id: "6",
    type: "task",
    description: 'New task "Implement user authentication" added',
    date: "2023-06-01T10:00:00Z",
  },
  {
    id: "7",
    type: "comment",
    description: 'John Doe commented on task "Design homepage"',
    date: "2023-06-02T14:30:00Z",
  },
  {
    id: "8",
    type: "task",
    description: 'Task "Create API documentation" completed',
    date: "2023-06-03T09:15:00Z",
  },
  {
    id: "9",
    type: "task",
    description: 'New task "Optimize database queries" added',
    date: "2023-06-04T11:45:00Z",
  },
  {
    id: "10",
    type: "comment",
    description: 'Jane Smith commented on task "Implement user authentication"',
    date: "2023-06-05T16:20:00Z",
  },
  // Add more items as needed
];

const ProjectChangelog = () => {
  return (
    <Card className="w-full h-full bg-card">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <HistoryIcon className="w-6 h-6 mr-2" />
          Changelog
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)] px-6">
          {changelogItems.map((item, index) => (
            <div key={item.id} className={`py-4 ${index !== changelogItems.length - 1 ? 'border-b' : ''}`}>
              <div className="flex items-center space-x-2 mb-1">
                {item.type === 'task' ? (
                  <CheckSquareIcon className="w-4 h-4 text-primary" />
                ) : (
                  <MessageSquareIcon className="w-4 h-4 text-primary" />
                )}
                <Badge variant={item.type === 'task' ? 'default' : 'secondary'}>
                  {item.type === 'task' ? 'Task' : 'Comment'}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleString()}
                </span>
              </div>
              <p className="text-sm font-medium ml-6">{item.description}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProjectChangelog;
