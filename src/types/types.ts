export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshToken?: string;
  avatar: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  teamLead:  User;
  teamMembers: ({ avatar: string } | User)[];
  startDate: string;
  endDate: string;
  updatedAt?: string;
}
