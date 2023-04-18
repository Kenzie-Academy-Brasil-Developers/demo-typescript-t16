import { createContext, useState } from "react";
import { ILoginFormData } from "../components/LoginForm";
import { IRegisterFormData } from "../components/RegisterForm";
import { api } from "../services/api";

//tipo mais apropriado para descrever objetos (interface)
interface IUserProviderProps {
   children: React.ReactNode;
}

//Descreve o value do provider e associado no objeto vazio como parâmetro do createContext
interface IUserContext{
    userLogin: (formData: ILoginFormData) => Promise<void>;
    userRegister: (formData: IRegisterFormData) => Promise<void>;
}    


export const UserContext = createContext({} as IUserContext);

/*
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwiaWF0IjoxNjgxMjI2MzU1LCJleHAiOjE2ODEyMjk5NTUsInN1YiI6IjIifQ.HoHzAjg6luV9k6v8zHyewSTHsUnAKDBIbFiIS0r_joM",
	"user": {
		"email": "johndoe@email.com",
		"name": "John Doe",
		"job": "Jornalista",
		"id": 1
	}
    */
 
export const UserProvider = ({ children }: IUserProviderProps) => {
   const [user, setUser] = useState(null);

   const userLogin = async (formData: ILoginFormData) => {
      try {
         const { data } = await api.post("/login", formData);
         localStorage.setItem("@TOKEN", data.accessToken);
         setUser(data.user);
      } catch (error) {
         console.log(error);
      }
   };

   const userRegister = async (formData: IRegisterFormData) => { 
      try {
        await api.post("/users", formData);
        console.log("Cadastro efetuado com sucesso");
      } catch (error) {
         console.log(error);
      }    
   };

   return <UserContext.Provider value={{ userLogin, userRegister }}>{children}</UserContext.Provider>;
};
