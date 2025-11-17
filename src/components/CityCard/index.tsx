import { Mask } from '../Mask'
import styles from './citycard.module.css'

export function CityCard({image, city} : {image: string, city: string}) {
    return (
        <div style={{backgroundImage: `url(${image})`}} className={styles.card}>
            <Mask />
            <h3>{city}</h3>
        </div>
    )
}