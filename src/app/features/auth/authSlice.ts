import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<{ name: string }>) => {
      if (state.user) {
        state.user.name = action.payload.name;
      }
    },
    updateAvatar: (state, action: PayloadAction<{ avatar: string }>) => {
      if (state.user) {
        state.user.avatar = action.payload.avatar;
      }
    },
    updateEmail: (state, action: PayloadAction<{ email: string }>) => {
      if (state.user) {
        state.user.email = action.payload.email;
      }
    },

    loginFulfilled: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },

    logoutFulfilled: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  updateName,
  updateAvatar,
  updateEmail,
  loginFulfilled,
  logoutFulfilled,
} = authSlice.actions;

export default authSlice.reducer;
