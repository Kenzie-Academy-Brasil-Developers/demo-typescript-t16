import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NewsProvider } from "../../providers/NewsContext";
import { UserContext } from "../../providers/UserContext";

export const ProtectedRoutes = () => {
   const { user } = useContext(UserContext);

   return user ? (
      <NewsProvider>
         <Outlet />
      </NewsProvider>
   ) : (
      <Navigate to="/" />
   );
};
