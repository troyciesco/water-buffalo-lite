import { Category } from "@/types"
import styles from "./modal.module.css"
type SidebarProps = {
	categories: Category[]
	selectedCategoryId: string
	setSelectedCategoryId: (id: string) => void
}

export function Sidebar({
	categories,
	selectedCategoryId,
	setSelectedCategoryId
}: SidebarProps) {
	return (
		<div className={styles.sidebarContainer}>
			{categories && (
				<ul className={styles.categoryList}>
					<li>
						<button
							onClick={() => setSelectedCategoryId("")}
							className={`${styles.categoryListItem} ${
								selectedCategoryId === "" ? styles.categoryListItemSelected : ""
							}`}>
							All
						</button>
					</li>
					{categories?.map((category) => (
						<li key={category.id}>
							<button
								disabled={category.count === 0}
								onClick={() => setSelectedCategoryId(category.id)}
								className={`${styles.categoryListItem} ${
									selectedCategoryId === category.id
										? styles.categoryListItemSelected
										: ""
								}`}>
								{category.name} {category.count === 0 && "(no items)"}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
