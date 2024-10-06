import {
  BellIcon,
  CheckIcon,
  UserPlusIcon,
  ListTodoIcon,
  InfoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Notification = {
  id: string;
  type: "invitation" | "task" | "update";
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "invitation",
      title: "Project Invitation",
      description: "John Doe invited you to join Project X",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "task",
      title: "New Task Assigned",
      description: "You have been assigned a new task in Project Y",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "update",
      title: "Database Schema Updated",
      description: "The database schema for Project Z has been updated",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "invitation":
        return <UserPlusIcon className="h-4 w-4 text-blue-500" />;
      case "task":
        return <ListTodoIcon className="h-4 w-4 text-green-500" />;
      case "update":
        return <InfoIcon className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 space-y-2">
          <h4 className="font-medium leading-none">Notifications</h4>
          <p className="text-sm text-muted-foreground">
            You have {unreadCount} unread notifications
          </p>
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <p className="text-sm text-center text-muted-foreground p-4">
              No notifications
            </p>
          ) : (
            notifications.map((notification, index) => (
              <div key={notification.id}>
                {index > 0 && <Separator />}
                <div
                  className={cn(
                    "flex items-start gap-4 p-4 hover:bg-accent cursor-pointer transition-colors",
                    !notification.read && "bg-accent/50"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  {getIcon(notification.type)}
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
export default NotificationMenu;
