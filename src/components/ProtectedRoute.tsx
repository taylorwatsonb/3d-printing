
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  // While checking if the user is authenticated, show nothing
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If user is authenticated, render the children
  return <Outlet />;
};

export default ProtectedRoute;
