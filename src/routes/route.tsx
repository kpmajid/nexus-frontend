import { createBrowserRouter } from "react-router-dom";

import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import RegistrationPage from "../pages/RegistrationPage.tsx";
import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
// import Signup from "../pages/Signup.tsx";
// import ForgotPassword from "../pages/ForgotPassword.tsx";
// import OtpVerification from "../pages/OtpVerification.tsx";
// import Projects from "../pages/Projects.tsx";
// import ProjectDetails from "../pages/ProjectDetails.tsx";
import NotFound from "../pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <RegistrationPage />,
      },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      // {
      //   // element: <ProtectedRoute />, // Specify is user logined?
      //   children: [
      //     {
      //       path: "projects",
      //       //   element: <Projects />,
      //     },
      //     {
      //       path: ":projectId",
      //       // element: <ProtectedProjectRoute />,
      //       children: [
      //         {
      //           path: "overview",
      //           //   element: <ProjectDetails />,
      //         },
      //         {
      //           path: "tasks",
      //           //   element: <Tasks />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "profile",
      //       //   element: <Profile />,
      //     },
      //   ],
      // },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
