import styles from "./header.module.css"

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<span className={styles.badge}>LITE</span>
				<span className={styles.text}>WB</span>
			</div>
		</header>
	)
}
