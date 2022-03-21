import { Navigate } from "react-router-dom";

export const GuardedRoute = ({ children, isAuth}) => {
    if (isAuth ) {
      return children
    }
      
    return <Navigate to="/" />
}

export default GuardedRoute