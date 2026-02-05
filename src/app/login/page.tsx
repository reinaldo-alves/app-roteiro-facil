import Link from "next/link";
import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import LoginForm from "./loginForm";

export default function Login() {
    return (
        <div className="page">
            <Header removeInput removeUser />
            <main className={styles.main}>
                <h1>Faça o Login</h1>
                <p>Insira seus dados para ter acesso a todos os serviços do Roteiro Fácil</p>
                <LoginForm />
                <Link href="/registrar" style={{textDecoration: 'underline'}}>Criar uma conta</Link>
            </main>
            <Footer />
        </div>
    )
}