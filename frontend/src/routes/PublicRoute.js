import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} element={<Component />} />;
};

export default PublicRoute;