import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: string; name: string; email: string; token: string } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => {},
    logout: () => {},
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
