import styles from './mask.module.css'

export function Mask({borderRadius}: {borderRadius? : string}) {
    return (
        <div style={{borderRadius: borderRadius? borderRadius : '20px'}} className={styles.mask}></div>
    )
}