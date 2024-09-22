export interface Project {
  _id: string;
  title: string;
  description: string;
  creator: string;
  status: string;
  members: { avatar: string }[];
  progress: number;
  startDate: string;
  endDate: string;
}
