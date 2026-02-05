import Link from 'next/link'
import styles from './header.module.css'
import { FaSearch } from 'react-icons/fa'
import { IconInput } from '../IconInput'
import { HeaderUser } from './HeaderUser'

export function Header({removeInput, removeUser}: {removeInput?: boolean, removeUser?: boolean}) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/">
                    <h1>Roteiro Fácil</h1>
                </Link>
                <div style={{display: removeInput? 'none' : 'block'}} className={styles.inputContainer}>
                    <IconInput type='text' placeholder='Pesquise destinos, atrações, experiências...'>
                        <FaSearch />
                    </IconInput>
                </div>
                <HeaderUser removeUser={removeUser} />
            </div>
        </header>
    )
}