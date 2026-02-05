import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NovoRoteiroWizard from "@/components/NovoRoteiroWizard";
import { Suspense } from "react";

export default function NovoRoteiro() {
    return (
        <div className="page">
            <Header />
            <main className={styles.main}>
                <h1>Novo Roteiro</h1>
                <Suspense fallback={<div>Carregando...</div>}>
                    <NovoRoteiroWizard />
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}