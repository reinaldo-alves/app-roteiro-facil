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
                <h1>Faça o Login</h1>
                <p>Insira seus dados para ter acesso a todos os serviços do Roteiro Fácil</p>
                <IconInput type="email" placeholder="Insira seu email"></IconInput>
                <IconInput type="password" placeholder="Insira sua senha"></IconInput>
                <Button type='primary'>Login</Button>
                <Link href="/registrar" style={{textDecoration: 'underline'}}>Criar uma conta</Link>
            </main>
            <Footer />
        </div>
    )
}