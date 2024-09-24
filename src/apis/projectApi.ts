import api from "./axiosInstance";
import errorHandle from "./error";

export const searchUser = async (email?: string) => {
  try {
    const response = await api.get(`/users/search?email=${email}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const createProject = async (projectDetails: {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const response = await api.post("/projects", projectDetails);
    console.log(response);
    localStorage.setItem("accessToken", response.data.token);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchProjectDetails = async (id: string) => {
  try {
    const response = await api.get(`/projects/${id}`);

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const editProject = async ({
  projectId,
  title,
  description,
  startDate,
  endDate,
}: {
  projectId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const projectDetails = { title, description, startDate, endDate };
    console.log(projectDetails, "projectDetails");
    console.log(projectId, "projectId");
    const response = await api.put(`/projects/${projectId}`, projectDetails);
    console.log(response);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
