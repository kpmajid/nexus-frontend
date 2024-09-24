import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import projectReducer from "./features/projects/projectsSlice";
import projectDetailsReducer from "./features/project/projectDetailsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    projectDetails: projectDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
