import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProps {
    children: ReactNode;
}

interface User { 
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

interface AuthContextData { 
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export function AuthProvider(props: AuthContextProps) {

    const [user, setUser] = useState<User | null>(null);

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=96bb18486dce1a96e3ef`

    const signIn = async (githubCode: string) => {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        })
        const { token, user } = response.data;
        console.log('Esse é o response data: ' + response.data)

        localStorage.setItem('@dowhile:token', token)

        setUser(user)
        console.log('User é ' +user)
        console.log('Token é '+ token)
    }

    const signOut = () => {
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token');


        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<User>('profile').then(response => {
                setUser(response.data)
            })
        }
    }, [])

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');

            window.history.pushState({}, '', urlWithoutCode)
            console.log(urlWithoutCode, githubCode);

            signIn(githubCode);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signInUrl, signOut, user }}> 
        {/* primeira chave indica JS, segunda indica objeto */}
            {props.children}
        </AuthContext.Provider>
    )
}