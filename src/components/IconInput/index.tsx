import { InputHTMLAttributes, ReactNode } from 'react'
import styles from './iconinput.module.css'

export function IconInput({children, ...props} : {children?: ReactNode} & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className={styles.container}>
            {children}
            <input {...props}/>
        </div>
    )
}