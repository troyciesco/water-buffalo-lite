import styles from "./modal.module.css"

type ContentProps = {
	items: any[]
	selectedItemId: string
	onClick: (item: any) => void
	onDoubleClick: (item: any) => void
}

export function Content({
	items,
	selectedItemId,
	onClick,
	onDoubleClick
}: ContentProps) {
	return (
		<div className={styles.contentContainer}>
			{/* {loading && <div>loading</div>}
    {error && <div>error :(</div>} */}
			<div className={styles.contentGrid}>
				{items.length === 0 && (
					<div className={styles.contentNoItems}>
						No items match the search criteria
					</div>
				)}
				{items.map((item) => (
					<button
						key={item.id}
						className={styles.item}
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
