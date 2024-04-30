import { Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getAllLocalStorage } from "../services/storage";
import { useNavigate } from "react-router-dom";

const Info = () => { 
  const navigate = useNavigate()
  const storage = getAllLocalStorage()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

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
        setEmail(userLogin[0])
        setPassword(userLogin[1])

        if (userLogin) {
            navigate('/info');
        } else {
            navigate('/');
        }
    } else {
        // Lida com o caso em que o storage é null
        console.error('O localStorage está vazio.');
    }

    console.log(storage);
}, []);


    return (
        <>
            <Text fontSize='3xl' fontWeight='bold'>
                Informações da conta
            </Text>
            <Text fontSize='xl'>
                Email
            </Text>
            <Text fontSize='xl'>
                {email}
            </Text>
            <Text fontSize='xl'>
                Senha:
            </Text>
            <Text fontSize='xl'>
              {password}
            </Text>
        </>
    )
}

export default Info
