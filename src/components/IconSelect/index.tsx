import { ReactNode } from 'react'
import styles from './iconselect.module.css'

export function IconSelect({children, options} : {children?: ReactNode, options: Array<string>}) {
    return (
        <div className={styles.container}>
            {children}
            <select>
                {options.map(option => <option key={option}>{option}</option>)}
            </select>
        </div>
    )
}