import Link from "next/link";
import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconInput } from "@/components/IconInput"
import { Button } from "@/components/Button";
import { attractions } from "@/app/atractions";
import { Mask } from "@/components/Mask";
import { FaStar } from "react-icons/fa";

export default async function Atracao({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const attraction = attractions.find(attraction => attraction.id === Number(id));
    if (!attraction) {
        return <h1>Atração não encontrada</h1>
    }
    return (
        <div className="page">
            <Header />
            <main className={styles.main}>
                <section style={{backgroundImage: `url(${attraction.images})`}} className={styles.hero}>
                    <Mask borderRadius="0" />
                    <div className={styles.info}>
                        <div>
                            <h1>{attraction.name}</h1>
                            <h2>{attraction.city}</h2>
                        </div>
                        <div className={styles.reviews}>
                            <FaStar />
                            {attraction.score}
                        </div>
                    </div>
                </section>
                <div className={styles.info}>
                    <h3>Descrição:</h3>
                    <p>{attraction.description}</p>
                </div>
                <div className={styles.info}>
                    <h3>Área:</h3>
                    <p>{attraction.area}</p>
                </div>
                <div className={styles.info}>
                    <h3>Categoria:</h3>
                    <p>{attraction.category}</p>
                </div>
                <div className={styles.info}>
                    <h3>Preço:</h3>
                    <p>{attraction.price > 0 ? `R$ ${attraction.price}` : 'Gratuito'}</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}