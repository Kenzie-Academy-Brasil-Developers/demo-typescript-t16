import { Route, Routes } from "react-router-dom"
import { ProtectedRoutes } from "../components/ProtectedRoutes"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

export const RoutesMain = () => {
    return(
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<ProtectedRoutes />}>
                <Route index element={<HomePage />} />
            </Route>            
        </Routes>
    )
}