import { createContext, useEffect, useState } from "react";
import { TCreateNewsFormValues } from "../components/CreateNewsForm/createNewsFormSchema";
import { api } from "../services/api";

interface INewsProviderProps{
    children: React.ReactNode;
}

interface INew{
    id: number;
    category: string;
    title: string;
    content: string;
    author: string;
}

interface INewsContext{
    newsList: INew[];
    createNew: (newData: INewData) => Promise<void>;
    removeNew: (newId: number) => Promise<void>;
}

interface INewData extends TCreateNewsFormValues{
    author: string;
}

export const NewsContext = createContext({} as INewsContext);

export const NewsProvider = ({children}: INewsProviderProps) => {
    const [newsList, setNewsList] = useState<INew[]>([]);

    console.log(newsList)

    useEffect(() => {
        const newsLoad = async () => {
            try {
                const {data} = await api.get<INew[]>('/news');
                setNewsList(data);
            } catch (error) {
                console.log(error);
            }
        }
        newsLoad();
    }, [])
    
    const createNew = async (newData: INewData) => {
        const token = localStorage.getItem("@TOKEN");
        try {
            const {data} = await api.post<INew>('/news', newData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setNewsList([...newsList, data]);
        } catch (error) {
           console.log(error); 
        }
    } 

    const removeNew = async (newId: number) => {
        const token = localStorage.getItem("@TOKEN");
        try {
            await api.delete(`/news/${newId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            const newNewsList = newsList.filter(currentNew => currentNew.id !== newId);
            setNewsList(newNewsList);
            console.log('Notícia removida com sucesso!')
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <NewsContext.Provider value={{ newsList, createNew, removeNew }}>
            {children}
        </NewsContext.Provider>
    )
}