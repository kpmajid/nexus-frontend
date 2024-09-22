import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFulfilled, logoutFulfilled } from "@/app/features/auth/authSlice";
import { refreshAccessToken } from "@/apis/authApi";

import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  name: string;
  email: string;
  avatar: string;
}

const useRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refreshAccessToken();
        const decoded: DecodedToken = jwtDecode(response?.data.accessToken);
        const { userId, name, email } = decoded;
        const avatar = response?.data.avatar;

        if (!userId || !name || !email || !avatar) {
          throw new Error(
            "Decoded token does not contain required user information."
          );
        }

        dispatch(
          loginFulfilled({
            id: userId,
            name: name,
            email: email,
            avatar: avatar,
          })
        );
      } catch (error) {
        console.error(
          "Token refresh failed:",
          error instanceof Error ? error.message : "Unknown error"
        );

        dispatch(logoutFulfilled());
      }
    };

    refreshToken();
  }, [dispatch]);
};

export default useRefreshToken;
