import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserSearchInviteProps {
  onInvite: (users: User[]) => void;
}

const UserSearchInvite: React.FC<UserSearchInviteProps> = ({ onInvite }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleSearch = async () => {
    // TODO: Implement actual API call to search users
    const mockResults: User[] = [
      { id: "1", email: "user1@example.com", name: "User One" },
      { id: "2", email: "user2@example.com", name: "User Two" },
    ];
    setSearchResults(mockResults);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchResults((prev) => prev.filter((u) => u.id !== user.id));
  };

  const handleRemoveUser = (user: User) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
    setSearchResults((prev) => [...prev, user]);
  };

  const handleInvite = () => {
    onInvite(selectedUsers);
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search users by email/name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {searchResults.length > 0 && (
        <div>
          <Label>Search Results:</Label>
          <ul className="mt-2 space-y-2">
            {searchResults.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <span>
                  {user.name} ({user.email})
                </span>
                <Button onClick={() => handleSelectUser(user)}>Select</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedUsers.length > 0 && (
        <div>
          <Label>Selected Users:</Label>
          <ul className="mt-2 space-y-2">
            {selectedUsers.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <span>
                  {user.name} ({user.email})
                </span>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveUser(user)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Button className="mt-4" onClick={handleInvite}>
            Invite Selected Users
          </Button>
        </div>
      )}
    </div>
  );
};
export default UserSearchInvite;
