import { useEffect, useRef } from "react";
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
  const refreshingRef = useRef(false);

  useEffect(() => {
    const refreshToken = async () => {
      if (refreshingRef.current) return;
      refreshingRef.current = true;

      try {
        const data = await refreshAccessToken();
        if (!data) {
          return;
        }
        const decoded: DecodedToken = jwtDecode(data.accessToken);
        const { userId, name, email } = decoded;
        const avatar = data.avatar | "";

        if (!userId || !name || !email) {
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
      } finally {
        refreshingRef.current = false;
      }
    };
    refreshToken();

    const intervalId = setInterval(refreshToken, 14 * 60 * 1000); // Refresh every 14 minutes

    return () => clearInterval(intervalId);
  }, [dispatch]);
};

export default useRefreshToken;
