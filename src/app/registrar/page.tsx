import Link from "next/link";
import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconInput } from "@/components/IconInput"
import { Button } from "@/components/Button";

export default function Login() {
    return (
        <div className="page">
            <Header removeInput removeUser />
            <main className={styles.main}>
                <h1>Crie sua conta</h1>
                <p>Insira seus dados para ter acesso a todos os serviços do Roteiro Fácil</p>
                <IconInput type="email" placeholder="Insira seu nome"></IconInput>
                <IconInput type="email" placeholder="Insira seu email"></IconInput>
                <IconInput type="password" placeholder="Insira sua senha"></IconInput>
                <IconInput type="password" placeholder="Insira sua senha novamente"></IconInput>
                <Button type='primary'>Criar conta</Button>
                <Link href="/login" style={{textDecoration: 'underline'}}>Voltar para login</Link>
            </main>
            <Footer />
        </div>
    )
}