import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/types";

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects = [action.payload, ...state.projects];
    },
  },
});

export const { setProjects, addProject } = projectsSlice.actions;

export default projectsSlice.reducer;
