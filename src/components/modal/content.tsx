import { CategoryItem } from "@/types"
import styles from "./modal.module.css"

type ContentProps = {
	items: CategoryItem[]
	selectedItemId: string
	onClick: (item: CategoryItem) => void
	onDoubleClick: (item: CategoryItem) => void
}

export function Content({
	items,
	selectedItemId,
	onClick,
	onDoubleClick
}: ContentProps) {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.contentGrid}>
				{items.length === 0 && (
					<div className={styles.contentNoItems}>
						No items match the search criteria
					</div>
				)}
				{items.map((item) => (
					<button
						key={item.id}
						className={`${styles.item} ${
							selectedItemId === item.id ? styles.itemSelected : ""
						}`}
						onClick={() => onClick(item)}
						onDoubleClick={() => onDoubleClick(item)}>
						<div className={styles.icon}></div>
						<div>
							<div className={styles.itemName}>{item.name}</div>
							<div className={styles.itemDescription}>{item.description}</div>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}
