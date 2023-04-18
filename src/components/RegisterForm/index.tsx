/*
{
   "name": "John Doe",
   "email": "johndoe@email.com",
   "password": "123456",
   "job": "Jornalista"
}
*/

/* {name: 'Alex Conder', email: 'alex@kenzie.com.br', password: '@12Patinhos', job: 'Instrutor'} */

import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { UserContext } from "../../providers/UserContext";

//Intefaces são tipos para descrever objetos
export interface IRegisterFormData{
    name: string;
    email: string;
    password: string;
    job: string;
}

export const RegisterForm = () => {
    const { userRegister } = useContext(UserContext);
    const { register, handleSubmit, formState: {errors}} = useForm<IRegisterFormData>();

    const submit: SubmitHandler<IRegisterFormData> = (formData) => {
        userRegister(formData);
    }

    return(
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder="Seu nome" {...register("name")} />
            <input type="email" placeholder="Seu e-mail" {...register("email")} />
            <input type="password" placeholder="Crie uma senha" {...register("password")}/>
            <input type="text" placeholder="Seu trabalho" {...register("job")} />
            <button type="submit">Cadastrar</button>
        </form>
    )
}