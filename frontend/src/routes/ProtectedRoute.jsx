import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../services/authservice";

function ProtectedRoute({ children, rolRequerido }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido) {
    const user = getUser();
    if (!user || user.role !== rolRequerido) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;