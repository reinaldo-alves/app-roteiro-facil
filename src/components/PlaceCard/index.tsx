import styles from './placecard.module.css'
import Link from "next/link";
import { FaStar } from 'react-icons/fa'

export function PlaceCard({image, title, city, score, id} : {image: string, title: string, city: string, score: number, id: number}) {
    return (
        <Link href={`/atracao/${id}`} className={styles.card}>
            <div style={{backgroundImage: `url(${image})`}} className={styles.image}></div>
            <div className={styles.details}>
                <h3>{title}</h3>
                <p>{city}</p>
                <div className={styles.reviews}>
                    <FaStar />
                    {score}
                </div>
            </div>
        </Link>
    )
}