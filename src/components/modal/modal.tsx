import { Overlay } from "./overlay"
import styles from "./modal.module.css"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Content } from "./content"

type ModalProps = {
	prompt: string
	onClose: () => void
	onSubmit: (item: any | null) => void
}
export function Modal({ prompt, onClose, onSubmit }: ModalProps) {
	const { loading, error, data } = { loading: false, error: false, data: [] }

	const [selectedItem, setSelectedItem] = useState<any | null>(null)
	const [searchString, setSearchString] = useState("")

	const [selectedCategoryId, setSelectedCategoryId] = useState("")

	return (
		<div className={styles.modal}>
			<Overlay onClose={onClose} />
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.title}>Action Types</div>
					<input
						type="text"
						placeholder="Search"
						className={styles.search}
						name="search"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
					/>
				</div>
				<div className={styles.modalBody}>
					<Sidebar
						categories={[]}
						selectedCategoryId={selectedCategoryId}
						setSelectedCategoryId={setSelectedCategoryId}
						loading={loading}
						error={error}
					/>
					<Content
						items={[]}
						selectedItemId={selectedItem?.id || ""}
						onClick={(item) => setSelectedItem(item)}
						onDoubleClick={(item) => {
							setSelectedItem(item)
						}}
					/>
				</div>
				<div className={styles.footer}>
					<div className={styles.prompt}>{prompt}</div>
					<div className={styles.actionRow}>
						{selectedItem && (
							<div className={styles.selectionText}>
								Selected: {selectedItem.name}
							</div>
						)}
						<button className="btn-primary">Add</button>
						<button onClick={onClose} className={styles.closeBtn}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
