/*
{
   "email": "johndoe@email.com",
   "password": "123456"
}
*/

import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { UserContext } from "../../providers/UserContext";

export interface ILoginFormData{
    email: string;
    password: string;
}

export const LoginForm = () => {
    const { userLogin } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>();

    const submit: SubmitHandler<ILoginFormData> = (formData) => {
        userLogin(formData);
    }

    return(
        <form onSubmit={handleSubmit(submit)}>
            <input type="email" {...register("email")} />
            <input type="password" {...register("password")} />
            <button>Entrar</button>
        </form>
    )
}