/*
{
   "email": "johndoe@email.com",
   "password": "123456"
}
*/

import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { UserContext } from "../../providers/UserContext";
import { Input } from "../Input";

export interface ILoginFormData{
    email: string;
    password: string;
}

export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const { userLogin } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>();

    const submit: SubmitHandler<ILoginFormData> = (formData) => {
        userLogin(formData, setLoading);
    }

    return(
        <form onSubmit={handleSubmit(submit)}>
            <Input type="email" register={register("email")} disabled={loading} />            
            <Input type="password" register={register("password")} disabled={loading} />
            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}