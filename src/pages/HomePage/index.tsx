import { useContext } from "react"
import { CreateNewsForm } from "../../components/CreateNewsForm";
import { NewsContext } from "../../providers/NewsContext";
import { UserContext } from "../../providers/UserContext"

export const HomePage = () => {
    const { user, userLogout } = useContext(UserContext);
    const { newsList, removeNew } = useContext(NewsContext);
    
    return(
        <div>
            <header>
                <span>{user?.name}</span>
                <span>{user?.email}</span>
                <button onClick={() => userLogout()}>Sair</button>
            </header>
            <CreateNewsForm />
            {newsList.map(currentNew => (
                <li key={currentNew.id}>
                    <h3>{currentNew.title}</h3>
                    <p>{currentNew.content}</p>
                    <span>{currentNew.author}</span>
                    <button onClick={() => removeNew(currentNew.id)}>Remover</button>
                </li>
            ))}
        </div>
    )
}