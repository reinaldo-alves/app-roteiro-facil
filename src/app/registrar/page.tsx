import Link from "next/link";
import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RegistrarForm from "./registrarForm";

export default function Registrar() {
    return (
        <div className="page">
            <Header removeInput removeUser />
            <main className={styles.main}>
                <h1>Crie sua conta</h1>
                <p>Insira seus dados para ter acesso a todos os serviços do Roteiro Fácil</p>
                <RegistrarForm />
                <Link href="/login" style={{textDecoration: 'underline'}}>Voltar para login</Link>
            </main>
            <Footer />
        </div>
    )
}