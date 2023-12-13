import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  return userData?.jsonToken !== undefined ? children : <Navigate to="/auth" />;
};
export default ProtectedRoute;
