import { createBrowserRouter } from "react-router-dom";

import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import VerifyEmail from "../pages/VerifyEmail.tsx";
import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import NotFound from "../pages/NotFound.tsx";
import RequireAuth from "@/components/RequireAuth.tsx";
import Layout from "@/components/Layout.tsx";
import Projects from "@/pages/Projects.tsx";
import ProjectLayout from "@/components/ProjectLayout/ProjectLayout.tsx";

import ProfileLayout from "@/components/ProfileLayout/ProfileLayout.tsx";

import GeneralInformation from "@/pages/GeneralInformation.tsx";
import ProjectOverview from "@/components/Project/ProjectOverview.tsx";
import ResetPassword from "@/pages/ResetPassword.tsx";
import ProfileChangePasswordSection from "@/components/Profile/ProfileChangePasswordSection.tsx";
import ProjectMembers from "@/components/Project/ProjectMembers/ProjectMembers.tsx";

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
        element: <RegisterPage />,
      },
      { path: "login", element: <Login /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: "projects",
                element: <Projects />,
              },
              {
                path: "chats",
                element: <div>Chats</div>,
              },
              {
                path: "meet",
                element: <div>Meets</div>,
              },
            ],
          },
          {
            path: "profile",
            element: <ProfileLayout />,
            children: [
              {
                index: true,
                element: <GeneralInformation />,
              },
              {
                path: "change-password",
                element: <ProfileChangePasswordSection />,
              },
            ],
          },
          {
            path: ":id/",
            element: <ProjectLayout />,
            children: [
              {
                index: true,
                element: <ProjectOverview />,
              },
              {
                path: "members",
                element: <ProjectMembers />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
