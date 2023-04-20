import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TLoginFormValues } from "../components/LoginForm/loginFormSchema";
import { TRegisterFormValues } from "../components/RegisterForm/registerFormSchema";
import { api } from "../services/api";

//tipo mais apropriado para descrever objetos (interface)
interface IUserProviderProps {
   children: React.ReactNode;
}

//Descreve o value do provider e associado no objeto vazio como parâmetro do createContext
interface IUserContext {
   user: IUser | null;
   userLogin: (formData: TLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
   userRegister: (formData: TRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
   userLogout: () => void;
}

interface IUser {
   email: string;
   name: string;
   job: string;
   id: number;
}

interface IUserLoginResponse {
   accessToken: string;
   user: IUser;
}

interface IUserRegisterResponse {
   accessToken: string;
   user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
   const [user, setUser] = useState<IUser | null>(null);

   useEffect(() => {
      const token = localStorage.getItem("@TOKEN");
      const userId = localStorage.getItem("@USERID");

      const userAutoLogin = async () => {
         try {
            const {data} = await api.get<IUser>(`/users/${userId}`, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            setUser(data);
            navigate('/home');
         } catch (error) {
            console.log(error);
            localStorage.removeItem("@TOKEN");
            localStorage.removeItem("@USERID");
         }
      }

      if(token && userId){
         userAutoLogin();
      }
   }, [])

   const navigate = useNavigate();
   

   const userLogin = async (formData: TLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
         setLoading(true);
         const { data } = await api.post<IUserLoginResponse>("/login", formData);
         localStorage.setItem("@TOKEN", data.accessToken);
         localStorage.setItem("@USERID", JSON.stringify(data.user.id));
         setUser(data.user);
         navigate("/home");
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const userRegister = async (formData: TRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
         setLoading(true);
         await api.post<IUserRegisterResponse>("/users", formData);
         console.log("Cadastro efetuado com sucesso");
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const userLogout = () => {
      localStorage.removeItem("@TOKEN");
      localStorage.removeItem("@USERID");
      setUser(null);
      navigate("/");
   };

   return (
      <UserContext.Provider value={{ user, userLogin, userRegister, userLogout }}>
         {children}
      </UserContext.Provider>
   );
};
