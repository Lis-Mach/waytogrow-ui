import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import NavbarDetails from "../pages/NavbarDetails";
import FooterDetails from "../pages/FooterDetails";

export const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return (
    <>
      <NavbarDetails />
      <Outlet /> {/* Renders child routes */}
      <FooterDetails />
    </>
  );
};
