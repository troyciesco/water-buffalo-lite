import styles from "./modal.module.css"
type SidebarProps = {
	categories: any[]
	selectedCategoryId: string
	setSelectedCategoryId: (id: string) => void
	loading: boolean
	error?: any
}

export function Sidebar({
	categories,
	selectedCategoryId,
	setSelectedCategoryId
}: // loading,
// error
SidebarProps) {
	return (
		<div className={styles.sidebarContainer}>
			{categories && (
				<ul className={styles.categoryList}>
					<li>
						<button className={`${styles.categoryItem}`}>All</button>
					</li>
				</ul>
			)}
		</div>
	)
}
