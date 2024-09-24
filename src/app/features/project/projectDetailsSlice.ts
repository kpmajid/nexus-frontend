import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/types";

interface ProjectDetailsState {
  project: Project | null;
  role: "teamLead" | "teamMember" | null;
}

const initialState: ProjectDetailsState = {
  project: null,
  role: null,
};

export const projectDetailsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectDetails: (state, action: PayloadAction<Project>) => {
      state.project = action.payload;
    },
    setUserRole: (state, action: PayloadAction<"teamLead" | "teamMember">) => {
      state.role = action.payload;
    },
    clearProjectDetails: (state) => {
      state.project = null;
      state.role = null;
    },
  },
});

export const { setProjectDetails, setUserRole, clearProjectDetails } =
  projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
