import { DefaultLayout } from "@/layouts/default"
import { useState } from "react"
import { CategoryItem } from "./types"
import { createPortal } from "react-dom"

function App() {
	const [items] = useState<CategoryItem[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<DefaultLayout>
			<section style={{ padding: "1rem" }}>
				<h1>Workflow Builder</h1>
			</section>
			<section style={{ display: "flex", justifyContent: "center" }}>
				<div
					style={{
						display: "flex",
						position: "relative",
						flexDirection: "column",
						padding: "1rem",
						marginBottom: "1rem",
						backgroundColor: "#ffffff",
						border: "1px solid var(--color-dark)",
						minWidth: 320
					}}>
					<div
						style={{
							marginBottom: "1rem",
							fontSize: "1.125rem",
							fontWeight: "bold"
						}}>
						Stage: Alpha
					</div>
					{items.length === 0 ? (
						<div>no items yet</div>
					) : (
						<ul
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0.5rem"
							}}>
							{items.map((item) => (
								<div
									key={item.id}
									style={{
										cursor: "grab",
										backgroundColor: "var(--color-light)",
										padding: "0.5rem",
										border: "1px solid"
									}}>
									{item.name}
								</div>
							))}
						</ul>
					)}
					<button
						onClick={() => setIsModalOpen(true)}
						className="btn-primary"
						style={{
							alignSelf: "flex-end",
							marginTop: "1rem"
						}}>
						Add new item +
					</button>
				</div>
			</section>
			{createPortal(
				isModalOpen ? (
					<div style={{ position: "fixed", zIndex: 10, top: 0 }}>
						this is the modal
					</div>
				) : null,
				document.body
			)}
		</DefaultLayout>
	)
}

export default App
