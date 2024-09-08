To implement a layout with a navbar and a left sidebar after user login
Step 1: Create the Layout Component
Step 2: Update Your Router Configuration
Wrap the children of the protected route with the Layout component.
Step 3: Create the Navbar and Sidebar Components

```
// src/components/Layout.tsx

import React from 'react';
import Navbar from './Navbar'; // Assume you have a Navbar component
import Sidebar from './Sidebar'; // Assume you have a Sidebar component

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
```

```
import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";
import Signup from "../pages/Signup.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import OtpVerification from "../pages/OtpVerification.tsx";
import Projects from "../pages/Projects.tsx";
import ProjectDetails from "../pages/ProjectDetails.tsx";
import NotFound from "../pages/NotFound.tsx";
import Layout from "../components/Layout.tsx"; // Import the Layout component

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
        element: <Register />,
      },
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />, // Check if the user is logged in
        children: [
          {
            element: <Layout />, // Use the Layout component
            children: [
              {
                path: "projects",
                element: <Projects />,
              },
              {
                path: ":projectId",
                element: <ProtectedProjectRoute />,
                children: [
                  {
                    path: "overview",
                    element: <ProjectDetails />,
                  },
                  {
                    path: "tasks",
                    element: <Tasks />,
                  },
                ],
              },
              {
                path: "profile",
                element: <Profile />,
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
```

```
// src/components/Navbar.tsx

import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <h1>My App</h1>
      {/* Add your navigation links here */}
    </nav>
  );
};

export default Navbar;
```

```
// src/components/Sidebar.tsx

import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      <h2>Sidebar</h2>
      {/* Add your sidebar links here */}
    </aside>
  );
};

export default Sidebar;
```
