'use client'

import { ReactNode } from 'react'
import styles from './button.module.css'
import { useRouter } from 'next/navigation'

export function Button({children, type, route, onClick, disabled} : {children: ReactNode, type: 'primary' | 'secondary', route?: string, onClick?: () => void, disabled?: boolean}) {
    const router = useRouter();
    return (
        <button type='button' disabled={disabled} onClick={route? () => router.push(route) : onClick? onClick : () => {}} className={`${styles.button} ${type === 'primary' ? styles.primary : styles.secondary}`}>
            {children}
        </button>
    )
}