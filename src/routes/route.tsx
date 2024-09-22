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
                element: <div>change-password</div>,
              },
            ],
          },
          {
            path: ":id/",
            element: <ProjectLayout />,
            children: [
              {
                path: "overview",
                // element: <Overview />,
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
