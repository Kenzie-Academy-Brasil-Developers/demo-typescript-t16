import { useContext } from "react"
import { NewsContext } from "../../providers/NewsContext";
import { UserContext } from "../../providers/UserContext"

export const HomePage = () => {
    const { user, userLogout } = useContext(UserContext);
    const { newsList } = useContext(NewsContext);
    
    return(
        <div>
            <header>
                <span>{user?.name}</span>
                <span>{user?.email}</span>
                <button onClick={() => userLogout()}>Sair</button>
            </header>
            {newsList.map(currentNew => (
                <li key={currentNew.id}>
                    <h3>{currentNew.title}</h3>
                    <p>{currentNew.content}</p>
                    <span>{currentNew.author}</span>
                </li>
            ))}
        </div>
    )
}