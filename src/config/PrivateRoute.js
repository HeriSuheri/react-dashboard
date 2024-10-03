import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../utils/helpers";

const PrivateRoute = () => {
  const isAuthenticated = () => {
    const lsData = getLocalStorage("user");
    return lsData; // Ensure it returns a boolean
  };


  return !isAuthenticated() ? <Navigate to="/" /> : <Outlet /> ;
  // return (
  //   <Outlet
  //     {...rest}
  //     render={(props) => (!isAuthenticated() ? <Navigate to="/" /> : children)}
  //   />
  // );
};

export default PrivateRoute;
