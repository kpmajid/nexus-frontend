import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "@/apis/authApi";
import { loginFulfilled, logoutFulfilled } from "@/app/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  name: string;
  email: string;
  avatar: string;
}

const useSessionPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const data = await refreshAccessToken();
        console.log(data, "data in initializeSession");
        if (data) {
          const decoded: DecodedToken = jwtDecode(data.accessToken);
          const { userId, name, email } = decoded;
          console.log(
            userId,
            name,
            email,
            "userId, name, email in initializeSession"
          );
          dispatch(
            loginFulfilled({
              id: userId,
              name: name,
              email: email,
              avatar: data.avatar,
            })
          );
        }
      } catch (error) {
        console.error("Failed to initialize session:", error);
        dispatch(logoutFulfilled());
      }
    };

    initializeSession();
  }, [dispatch]);
};

export default useSessionPersistence;
