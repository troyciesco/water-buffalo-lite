import { Header, Footer } from "@/components"
import { ReactNode } from "react"
import styles from "./default.module.css"

export function DefaultLayout({ children }: { children: ReactNode }) {
	return (
		<div className={styles.layoutContainer}>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</div>
	)
}
