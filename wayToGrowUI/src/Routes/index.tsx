import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import PlanPage from "../pages/plan/PlanPage";
import Login from "../pages/login/LoginPage";
import StepPage from "../pages/step/StepPage";
import UserPage from "../pages/user/UserPage";

import { LoginContextProvider } from "../providers/LoginContext";
import HomePage from "../pages/Home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import { UserContextProvider } from "../providers/UserContext";
import { PlanContextProvider } from "../providers/PlanContext";
import { StepContextProvider } from "../providers/StepContext";
import { SignupContextProvider } from "../providers/SignupContext";

// Define the Routes component with types
const Routes: React.FC = () => {
  const { token } = useAuth();

  

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: (
            <PlanContextProvider>
                <PlanPage />
            </PlanContextProvider>
          ),
        },
        {
          path: "/steps/:planId",
          element: (
            <StepContextProvider>
              <StepPage />
            </StepContextProvider>
          ),
        },
        {
          path: "/user",
          element: (
            <UserContextProvider>
              <UserPage />
            </UserContextProvider>
          ),
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: (
        <LoginContextProvider>
          <Login />
        </LoginContextProvider>
      ),
    },
    {
      path: "/register",
      element: (
        <SignupContextProvider>
          <RegisterPage />
        </SignupContextProvider>
      ),
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    // ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
