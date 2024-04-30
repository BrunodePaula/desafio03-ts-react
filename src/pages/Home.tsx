import { Box, Center, Input } from "@chakra-ui/react";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage, getAllLocalStorage } from "../services/storage";

const Home = () => {
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const { setIsLoggedIn, setUserLogin, userLogin } = useContext(AppContext)
    const navigate = useNavigate()
    const storage = getAllLocalStorage()

    
    useEffect(() => {
        if (storage) {
            let parsedStorage;
            try {
                parsedStorage = JSON.parse(storage);
            } catch (error) {
                // Trate qualquer erro de parsing aqui
                console.error('Erro ao fazer parsing do localStorage:', error);
            }
    
            const userLogin = parsedStorage && parsedStorage.userLogin;
    
            if (userLogin) {
                navigate('/conta/1');
            } else {
                navigate('/');
            }
        } else {
            // Lida com o caso em que o storage é null
            console.error('O localStorage está vazio.');
        }
    
        console.log(storage);
    }, []);
    

    const validateUser = async (email: string) => {
        const loggedIn = await login(email, password)

        if(!loggedIn){
            return alert('Email inválido ou senha inválida')
        }

        setIsLoggedIn(true)
        setUserLogin([email, password])
        changeLocalStorage({ login: true, userLogin: [email, password] })
        navigate('/conta/1')
    }
  
    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <Center>
                    <DButton
                        onClick={() => validateUser(email)}
                    />
                </Center>
            </Card>
        </Box>
    );
}

export default Home;
