import { createContext, useEffect, useState } from "react";
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
    
    return(
        <NewsContext.Provider value={{ newsList }}>
            {children}
        </NewsContext.Provider>
    )
}