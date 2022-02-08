import React, { FC } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.FC;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component }) => {
  const isAuthenticated = true;
  return isAuthenticated ? <Component /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
