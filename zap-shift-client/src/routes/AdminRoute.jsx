


import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();
  const location = useLocation();

  // 1 First check auth status loading
  if (loading || isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // 2 If NOT logged in → redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
