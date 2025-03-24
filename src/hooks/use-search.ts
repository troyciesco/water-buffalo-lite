import { Category, CategoryItem } from "@/types"
import { useEffect, useState } from "react"

type UseSearchProps = {
	items: CategoryItem[]
	categories: Category[]
	selectedCategoryId: string
	searchString: string
}

export function useSearch({
	items,
	categories,
	selectedCategoryId,
	searchString
}: UseSearchProps) {
	const [filteredItems, setFilteredItems] = useState(items)

	useEffect(() => {
		if (!items || !categories) return

		let initialItems = [...items]

		if (selectedCategoryId) {
			initialItems = initialItems.filter(
				(item) => item.category === selectedCategoryId
			)
		}

		if (searchString) {
			initialItems = initialItems.filter(
				(item) =>
					item.name.toLowerCase().includes(searchString.toLowerCase()) ||
					item.description.toLowerCase().includes(searchString.toLowerCase())
			)
		}

		setFilteredItems(initialItems)
	}, [items, categories, selectedCategoryId, searchString])

	return { filteredItems }
}
