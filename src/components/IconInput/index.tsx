import { HTMLInputTypeAttribute, ReactNode } from 'react'
import styles from './iconinput.module.css'

export function IconInput({children, type, placeholder} : {children?: ReactNode, type: HTMLInputTypeAttribute | undefined, placeholder?: string}) {
    return (
        <div className={styles.container}>
            {children}
            <input type={type} placeholder={placeholder}/>
        </div>
    )
}