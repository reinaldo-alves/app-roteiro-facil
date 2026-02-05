'use client'

import { IconInput } from "@/components/IconInput"
import { Button } from "@/components/Button";
import { useContext, useState } from "react";
import { apiPost } from "@/resources/api";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/navigation";

export default function RegistrarForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const router = useRouter();

    const userContext = useContext(UserContext);
    if(!userContext) return null;
    const {token} = userContext;

    const registrar = async () => {
        if(password !== confirmPassword){
            alert('As senhas não conferem');
            return;
        }
        const res = await apiPost('users', {name, email, password}, token);
        console.log(res);
        const data = await res.json();
        console.log(data);
        if(!res.ok) {
            alert(data?.message ?? 'Erro ao criar conta');
            return;
        }
        if(data.id) {
            alert('Conta criada com sucesso!');
            router.push('/login');
        }
    }
    
    return (
        <>
            <IconInput type="text" value={name} onChange={(e) => setName(e.target.value)}placeholder="Insira seu nome"></IconInput>
            <IconInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email"></IconInput>
            <IconInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Insira sua senha"></IconInput>
            <IconInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Insira sua senha novamente"></IconInput>
            <Button type='primary' onClick={registrar}>Criar Conta</Button>
        </>
    )
}