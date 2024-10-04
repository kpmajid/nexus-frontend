import { AxiosError } from "axios";
import api from "./axiosInstance";
import errorHandle, { ApiError } from "./error";

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

interface ProjectDetails {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

interface EditProjectParams extends ProjectDetails {
  projectId: string;
}

export const searchUsers = async (query: string) => {
  try {
    console.log(query);
    const response = await api.get(
      `/users/search?query=${encodeURIComponent(query)}`
    );
    console.log(response.data)
    return { data: response.data };
    
  } catch (error) {
    const apiError = errorHandle(error as Error | AxiosError);
    return { error: apiError };
  }
};

export const fetchProjects = async (): Promise<
  ApiResponse<ProjectDetails[]>
> => {
  try {
    const response = await api.get("/projects");
    return { data: response.data.projects };
  } catch (error) {
    const apiError = errorHandle(error as Error | AxiosError);
    return { error: apiError };
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
    return { data: response.data.project };
  } catch (error) {
    const apiError = errorHandle(error as Error | AxiosError);
    return { error: apiError };
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
}: EditProjectParams) => {
  try {
    const projectDetails: ProjectDetails = {
      title,
      description,
      startDate,
      endDate,
    };
    const response = await api.put(`/projects/${projectId}`, projectDetails);
    console.log(response);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return { data: response.data };
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
