'use client'

import styles from './header.module.css'
import { Button } from '../Button'
import { useContext } from 'react';
import { UserContext } from '@/app/contexts/UserContext';

export function HeaderUser({removeUser}: {removeUser?: boolean}) {
    const userContext = useContext(UserContext);
    if(!userContext) return null;
    const {user} = userContext;

    const logOut = () => {
        localStorage.removeItem('token');
        userContext.setUser(null);
        userContext.setToken(null);
    }
    
    return (
        <div className={styles.userContainer}>
            {user ? 
                <div className={styles.userInfo}>
                    <div className={styles.userImage}>{user.name.charAt(0).toUpperCase()}</div>
                    <div>
                        <p className={styles.userName}>{user.name}</p>
                        <p className={styles.logOut} onClick={logOut}>Sair</p>
                    </div>
                </div>
            :
                <Button type='secondary' route={removeUser? "/" : "/login"}>{removeUser? 'Página Inicial' : 'Login'}</Button>
            }
        </div>
    )
}