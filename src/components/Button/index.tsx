import { ReactNode } from 'react'
import styles from './button.module.css'

export function Button({children, type} : {children: ReactNode, type: 'primary' | 'secondary'}) {
    return (
        <button className={`${styles.button} ${type === 'primary' ? styles.primary : styles.secondary}`}>
            {children}
        </button>
    )
}