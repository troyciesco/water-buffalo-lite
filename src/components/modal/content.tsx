import { CategoryItem } from "@/types"
import styles from "./modal.module.css"
import { cn } from "@/lib/utils"

type ContentProps = {
	items: CategoryItem[]
	selectedItemId: string
	onClick: (item: CategoryItem) => void
	onDoubleClick: (item: CategoryItem) => void
	columns?: 1 | 2
}

export function Content({
	items,
	selectedItemId,
	onClick,
	onDoubleClick,
	columns = 2
}: ContentProps) {
	const showScroll = columns === 2 ? items.length > 6 : items.length > 1
	return (
		<div
			className={cn(styles.contentContainer, showScroll && styles.withScroll)}>
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
						<div
							className={cn(
								styles.icon,
								columns === 1 && styles.iconSmall
							)}></div>
						<div className={styles.itemText}>
							<div className={styles.itemName}>{item.name}</div>
							<div
								className={cn(
									styles.itemDescription,
									columns === 1 && styles.descriptionWide
								)}>
								{item.description}
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}
