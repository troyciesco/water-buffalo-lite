import { catalogPayload } from "@/catalog-payload"
import { Category, CategoryItem, Tag } from "@/types"
import { useEffect, useState } from "react"

type UseSearchProps = {
	items: CategoryItem[]
	categories: Category[]
	selectedCategoryId: string
	searchString: string
}

// assumes that tags/aliases should return true if string matches any part
// i.e. searchString of "qc" would return tags with "qc" and "qc failed"
const matchesTags = ({
	searchString,
	tags
}: {
	searchString: string
	tags: Tag[]
}) => {
	return tags.some((tag) => {
		if (tag.primary.toLowerCase().includes(searchString.toLowerCase())) {
			return true
		}
		return tag.aliases.some((alias) =>
			alias.toLowerCase().includes(searchString.toLowerCase())
		)
	})
}

export function useSearch({
	items,
	categories,
	selectedCategoryId,
	searchString
}: UseSearchProps) {
	const [filteredItems, setFilteredItems] = useState(items)
	const { tags } = catalogPayload

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
					item.description.toLowerCase().includes(searchString.toLowerCase()) ||
					matchesTags({
						searchString,
						tags: tags.filter((tag) => item.tags.includes(tag.id))
					})
			)
		}

		setFilteredItems(initialItems)
	}, [items, categories, selectedCategoryId, searchString, tags])

	return { filteredItems }
}
