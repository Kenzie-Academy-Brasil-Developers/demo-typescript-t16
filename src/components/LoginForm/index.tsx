/*
{
   "email": "johndoe@email.com",
   "password": "123456"
}
*/

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { UserContext } from "../../providers/UserContext";
import { Input } from "../Input";
import { loginFormSchema, TLoginFormValues } from "./loginFormSchema";

export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const { userLogin } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm<TLoginFormValues>({
        resolver: zodResolver(loginFormSchema)
    });

    const submit: SubmitHandler<TLoginFormValues> = (formData) => {
        userLogin(formData, setLoading);
    }

    return(
        <form onSubmit={handleSubmit(submit)}>
            <Input  type="email" {...register("email")} disabled={loading} error={errors.email}/>
            <Input type="password" {...register("password")} disabled={loading} error={errors.password} />

            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}