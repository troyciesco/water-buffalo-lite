import styles from "./overlay.module.css"

export function Overlay({ onClose }: { onClose: () => void }) {
	return <div className={styles.overlay} onClick={onClose}></div>
}
