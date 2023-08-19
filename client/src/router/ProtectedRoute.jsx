import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types, no-unused-vars
const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
