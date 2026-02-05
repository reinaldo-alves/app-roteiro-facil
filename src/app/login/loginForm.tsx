'use client'

import { IconInput } from "@/components/IconInput"
import { Button } from "@/components/Button";
import { useContext, useState } from "react";
import { apiPost } from "@/resources/api";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const router = useRouter();

    const userContext = useContext(UserContext);
    if(!userContext) return null;
    
    const {setUser, setToken} = userContext;
    
    const login = async () => {
        const res = await apiPost('signIn', {email, password}, null);
        console.log(res);
        const data = await res.json();
        console.log(data);
        if(!res.ok) {
            alert(data?.message ?? 'Erro ao fazer login');
            return;
        }
        if(data.access_token) {
            alert(data.access_token);
            localStorage.setItem('token', data.access_token);
            setUser(data.user);
            setToken(data.access_token);
            router.push('/');
        }
    }
    
    return (
        <>
            <IconInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email"></IconInput>
            <IconInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Insira sua senha"></IconInput>
            <Button type='primary' onClick={login}>Login</Button>
        </>
    )
}