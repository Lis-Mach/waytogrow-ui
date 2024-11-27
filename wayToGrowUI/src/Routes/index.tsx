import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout  from "../Pages/Logout";
import Login  from "../Pages/LoginPage";
import { LoginContextProvider } from "../Provider/LoginContext";

// Define the Routes component with types
const Routes: React.FC = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic: RouteObject[] = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: (
            <LoginContextProvider>
              <Logout />
            </LoginContextProvider>
          ),
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: (
        <LoginContextProvider>
          <Login />
        </LoginContextProvider>
      ),
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
