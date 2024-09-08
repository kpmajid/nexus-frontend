import { createSlice } from "@reduxjs/toolkit";

interface ProjectsState {
  user: { id: string; name: string; email: string; token: string } | null;
  isAuthenticated: boolean;
}

const initialState: ProjectsState = {
  user: null,
  isAuthenticated: false,
};

export const projectsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProjects: () => {},
    addProject: () => {},
  },
});

export const { setProjects, addProject } = projectsSlice.actions;

export default projectsSlice.reducer;
