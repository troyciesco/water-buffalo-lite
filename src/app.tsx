import { DefaultLayout } from "@/layouts/default"
import { useState } from "react"
import { CategoryItem } from "./types"
import { createPortal } from "react-dom"
import { Modal } from "./components/modal"
import styles from "./app.module.css"
import { cn } from "./lib/utils"

function App() {
	const [items, setItems] = useState<CategoryItem[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<DefaultLayout>
			<section className={styles.pageHeader}>
				<h1>Workflow Builder</h1>
			</section>
			<section className={styles.pageContent}>
				<div className={styles.stagePanel}>
					<div className={styles.stageTitle}>Stage: Alpha</div>
					{items.length === 0 ? (
						<div>no items yet</div>
					) : (
						<ul className={styles.list}>
							{items.map((item) => (
								<li key={item.id} className={styles.listItem}>
									{item.name}
								</li>
							))}
						</ul>
					)}
					<button
						onClick={() => setIsModalOpen(true)}
						className={cn("btn-primary", styles.openModalBtn)}>
						Add new item +
					</button>
				</div>
			</section>
			{createPortal(
				isModalOpen ? (
					<Modal
						prompt="Select an item for your workflow"
						onClose={() => setIsModalOpen(false)}
						onSubmit={(item) => item && setItems((prev) => [...prev, item])}
					/>
				) : null,
				document.body
			)}
		</DefaultLayout>
	)
}

export default App
