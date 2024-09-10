import { createSlice } from "@reduxjs/toolkit";

interface ProjectsState {
  projects: [{ id: string; name: string; email: string; token: string }] | [];
}

const initialState: ProjectsState = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: () => {},
    addProject: () => {},
  },
});

export const { setProjects, addProject } = projectsSlice.actions;

export default projectsSlice.reducer;
