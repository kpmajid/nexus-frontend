import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlusIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useDebouncedCallback } from "use-debounce";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { searchUsers, inviteUsers } from "@/apis/projectApi";

import UserListItem from "./InviteDialog/UserListItem";
import SelectedUserItem from "./InviteDialog/SelectedUserItem";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

const InviteDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  const { project } = useSelector((state: RootState) => state.projectDetails);

  const debouncedSearch = useDebouncedCallback(async (value: string) => {
    if (value.length > 2) {
      setIsLoading(true);
      const { data, error } = await searchUsers(value);

      if (data) {
        setUsers(data.users);
      } else if (error) {
        console.error("Error searching users:", error);
        // Optionally, show an error message to the user
      }
      setIsLoading(false);
    } else {
      setUsers([]);
    }
  }, 500);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    setUsers((prev) => prev.filter((u) => u._id !== user._id));
  }, []);

  const handleRemoveUser = useCallback(
    (userId: string) => {
      setSelectedUsers((prev) => prev.filter((u) => u._id !== userId));
      setUsers((prev) => {
        const removedUser = selectedUsers.find((u) => u._id === userId);
        return removedUser ? [...prev, removedUser] : prev;
      });
    },
    [selectedUsers]
  );

  const handleInvite = useCallback(async () => {
    if (selectedUsers.length === 0) return;
    if (!project) return;
    setIsInviting(true);
    const userIds = selectedUsers.map((user) => user._id);
    try {
      const { data, error } = await inviteUsers(project._id, userIds);
      if (data) {
        // Here you would send the invitations to the backend
        setSelectedUsers([]);
        setIsOpen(false);
      } else if (error) {
        console.error("Error inviting users:", error);
        // Show an error message to the user
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsInviting(false);
    }
  }, [selectedUsers]);

  const UserList = useMemo(() => {
    return ({ height, width }: { height: number; width: number }) => (
      <List
        height={height}
        itemCount={users.length}
        itemSize={60}
        width={width}
        itemData={users}
      >
        {({ index, style }) => (
          <div style={style}>
            <UserListItem user={users[index]} onSelect={handleSelectUser} />
          </div>
        )}
      </List>
    );
  }, [users, handleSelectUser]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlusIcon className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite New Member</DialogTitle>
          <DialogDescription>
            Search and select the users you'd like to invite to the project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or email"
            />
          </div>
          {isLoading && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          {users.length > 0 && (
            <div className="space-y-2">
              <Label>Search Results</Label>
              <ScrollArea className="h-[150px] rounded-md border">
                <AutoSizer disableHeight>
                  {({ width }) => <UserList height={200} width={width} />}
                </AutoSizer>
              </ScrollArea>
            </div>
          )}
          {selectedUsers.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Users</Label>
              <ScrollArea className="h-[100px] rounded-md border p-2">
                <div className="space-y-2">
                  {selectedUsers.map((user) => (
                    <SelectedUserItem
                      key={user._id}
                      user={user}
                      onRemove={handleRemoveUser}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleInvite}
            disabled={selectedUsers.length === 0 || isInviting}
          >
            {isInviting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inviting...
              </>
            ) : (
              "Send Invitation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
