import styles from './footer.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.links}>
                    <a href="#" target="_blank" rel="noopener noreferrer">Sobre a Roteiro Fácil</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">Entre em contato</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">Política de privacidade</a>
                </div>
                <p>© 2025 Desenvolvido por <a href="https://reinaldoalves.com.br" target="_blank">Reinaldo Alves</a>. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}