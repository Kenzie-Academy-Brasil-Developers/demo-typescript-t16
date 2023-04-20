import { z } from "zod";

export const createNewsFormSchema = z.object({
    category: z.string().nonempty("A categoria é obrigatória"),
    title: z.string().nonempty("O título é obrigatório."),
    content: z.string().nonempty("O conteúdo é obrigatório"),
})

export type TCreateNewsFormValues = z.infer<typeof createNewsFormSchema>;