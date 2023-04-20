import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewsContext } from "../../providers/NewsContext";
import { UserContext } from "../../providers/UserContext";
import { Input } from "../Input";
import { TCreateNewsFormValues } from "./createNewsFormSchema";

/*
"category": "economia",
   "title": "Imposto de Renda 2023: como declarar planos de previdência PGBL e VGBL.",
   "content": "Contribuições feitas para o PGBL são dedutíveis da base de cálculo do IR 2023 em até 12% da renda bruta tributável anual. Já o VGBL não permite o desconto.",
   "author": "Isabela Bolzani"
*/

export const CreateNewsForm = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<TCreateNewsFormValues>();
    const { user } = useContext(UserContext);    
    const { createNew } = useContext(NewsContext);

    const submit: SubmitHandler<TCreateNewsFormValues> = (formData) => {
        const newData = { author: user?.name as string, ...formData };
        createNew(newData);
    }

    return(
        <form onSubmit={handleSubmit(submit)}>
            <h1>Crie uma notícia</h1>
            <Input label="Categoria" type="text" {...register("category")} error={errors.category}  />
            <Input label="Título" type="text" {...register("title")} error={errors.title} />
            <Input label="Conteúdo" type="text" {...register("content")} error={errors.content} />
            <button type="submit">Enviar</button>
        </form>
    )
}