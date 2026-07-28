import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default AdminProtectedRoute;