import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import PlanPage from "../Pages/plan/PlanPage";
import Login from "../Pages/login/LoginPage";
import StepPage from "../Pages/step/StepPage";
import UserPage from "../Pages/user/UserPage";


import { LoginContextProvider } from "../Provider/LoginContext";
import HomePage from "../Pages/home/HomePage";
import RegisterPage from "../Pages/register/RegisterPage";
import { UserContextProvider } from "../Provider/UserContext";
import { PlanContextProvider } from "../Provider/PlanContext";
import { StepContextProvider } from "../Provider/StepContext";
import NavbarDetails from "../Pages/navbar";
import FooterDetails from "../Pages/footer";


// Define the Routes component with types
const Routes: React.FC = () => {
  const { token } = useAuth();

   // Define public routes accessible to all users
  // const routesForPublic: RouteObject[] = [
  //   {
  //     path: "/service",
  //     element: <div>Service Page</div>,
  //   },
  //   {
  //     path: "/about-us",
  //     element: <div>About Us</div>,
  //   },
  // ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <ProtectedRoute/> , // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: (
            <PlanContextProvider>
              <UserContextProvider>
              <PlanPage />
              </UserContextProvider>
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
        <UserContextProvider>
          <RegisterPage />
        </UserContextProvider>
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
