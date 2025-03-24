import { Overlay } from "./overlay"
import styles from "./modal.module.css"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Content } from "./content"
import { catalogPayload } from "@/catalog-payload"
import { CategoryItem } from "@/types"
import { useSearch } from "@/hooks/use-search"

type ModalProps = {
	prompt: string
	onClose: () => void
	onSubmit: (item: CategoryItem | null) => void
	buttonLabels?: {
		add?: string
		cancel?: string
	}
}
export function Modal({ prompt, onClose, onSubmit, buttonLabels }: ModalProps) {
	const { categories, items } = catalogPayload

	const sortedCategories = [...categories].sort((a, b) =>
		a.name.localeCompare(b.name)
	)

	const [searchString, setSearchString] = useState("")
	const [selectedCategoryId, setSelectedCategoryId] = useState("")
	const { filteredItems } = useSearch({
		items,
		categories,
		searchString,
		selectedCategoryId
	})

	const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null)

	const handleSubmit = () => {
		if (selectedItem) {
			onSubmit({
				...selectedItem,
				id: `${selectedItem.id}-${crypto.randomUUID()}`
			})
		}
		onClose()
	}
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
						categories={sortedCategories}
						selectedCategoryId={selectedCategoryId}
						setSelectedCategoryId={setSelectedCategoryId}
					/>
					<Content
						items={filteredItems}
						selectedItemId={selectedItem?.id || ""}
						onClick={(item) => setSelectedItem(item)}
						onDoubleClick={(item) => {
							setSelectedItem(item)
							handleSubmit()
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
						<button
							className="btn-primary"
							disabled={!selectedItem}
							onClick={handleSubmit}>
							{buttonLabels?.add || "Add"}
						</button>
						<button onClick={onClose} className={styles.closeBtn}>
							{buttonLabels?.cancel || "Cancel"}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
