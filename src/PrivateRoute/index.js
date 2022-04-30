import { Navigate, useLocation } from "react-router-dom";
import LoaderSync from "../component/LoaderSync";

const PrivateRoute = ({
  user,
  redirectPath = "/signin",
  children,
  authorizing,
}) => {
  const location = useLocation();
  return (
    <>
      {authorizing ? (
        <LoaderSync />
      ) : !user ? (
        <Navigate to={redirectPath} replace />
      ) : (
        children
      )}
    </>
  );

  // if (!user) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  // return children;
};
export default PrivateRoute;
