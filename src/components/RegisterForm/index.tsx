import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, TRegisterFormValues } from "./registerFormSchema";
import { Input } from "../Input";

//Intefaces são tipos para descrever objetos

export const RegisterForm = () => {
   const [loading, setLoading] = useState(false);
   const { userRegister } = useContext(UserContext);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<TRegisterFormValues>({
      resolver: zodResolver(registerFormSchema),
   });

   const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
      userRegister(formData, setLoading);
   };

   return (
      <form onSubmit={handleSubmit(submit)}>
         <Input
            type="text"
            placeholder="Seu nome"
            {...register("name")}
            disabled={loading}
            error={errors.name}
         />
         <Input
            type="email"
            placeholder="Seu e-mail"
            {...register("email")}
            disabled={loading}
            error={errors.email}
         />
         <Input
            type="password"
            placeholder="Crie uma senha"
            {...register("password")}
            disabled={loading}
            error={errors.password}
         />
         <Input
            type="password"
            placeholder="Confirme uma senha"
            {...register("confirm")}
            disabled={loading}
            error={errors.confirm}
         />
         <Input
            type="text"
            placeholder="Seu trabalho"
            {...register("job")}
            disabled={loading}
            error={errors.job}
         />
         <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
         </button>
      </form>
   );
};
