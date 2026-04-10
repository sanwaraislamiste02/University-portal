import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

 
  return children;
}

export default RoleRoute;