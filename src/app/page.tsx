import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { FaRoute } from "react-icons/fa";
import { PlaceCard } from "@/components/PlaceCard";
import { CityCard } from "@/components/CityCard";
import { Footer } from "@/components/Footer";
import { attractions } from "./atractions";

export default function Home() {
  return (
    <div className='page'>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Monte seu próprio roteiro de viagem de forma rápida e fácil</h1>
          <Button type="primary" route="/novo-roteiro"><FaRoute />Criar novo roteiro</Button>
        </section>
        <section className={styles.places}>
          <header>
            <h2>Atrações em destaque</h2>
            <a href="#">Ver todas</a>
          </header>
          <div className={styles.cardsContainer}>
            {attractions.map((attraction) => (
              <PlaceCard
                key={attraction.id}
                id={attraction.id}
                image={attraction.images}
                title={attraction.name}
                city={attraction.city}
                score={attraction.score}
              />
            ))}
          </div>
        </section>
        <section className={styles.places}>
          <header>
            <h2>Destinos em destaque</h2>
            <a href="#">Ver todos</a>
          </header>
          <div className={styles.cardsContainer}>
            <CityCard image="https://yavuzceliker.github.io/sample-images/image-1115.jpg" city="Floriano" />
            <CityCard image="https://yavuzceliker.github.io/sample-images/image-884.jpg" city="Caracaraí" />
            <CityCard image="https://yavuzceliker.github.io/sample-images/image-1973.jpg" city="Miranda" />
            <CityCard image="https://yavuzceliker.github.io/sample-images/image-1234.jpg" city="Vassouras" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
