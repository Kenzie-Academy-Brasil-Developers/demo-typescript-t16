import { Link } from "react-router-dom"
import { RegisterForm } from "../../components/RegisterForm"

export const RegisterPage = () => {
    return(
        <div>
            <Link to="/">Voltar</Link>
            <h1>Cadastre-se</h1>
            <RegisterForm />
        </div>
    )
}