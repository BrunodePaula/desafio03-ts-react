import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage } from "../services/storage"

interface IAppContext {
    user: string,
    isLoggedIn: boolean,
    userLogin: string[],
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    setUserLogin: (userLogin: string[]) => void
}
  
export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
    const [userLogin, setUserLogin] = useState<string[]>([])

    const storage = getAllLocalStorage()

    useEffect(() => {
      if(storage){
        const { login, user } = JSON.parse(storage)
        setIsLoggedIn(login)
        setUserLogin(user)
      }
    }, [])

    const user = 'nathally'
  
    return (
      <AppContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, setUserLogin, userLogin}}>
        { children }
      </AppContext.Provider>
    )
}
