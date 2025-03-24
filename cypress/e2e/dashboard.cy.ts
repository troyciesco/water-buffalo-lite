/// <reference types="cypress" />

describe("dashboard spec", () => {
	it("loads the dashboard page", () => {
		cy.visit("http://localhost:5173")
		cy.contains("Workflow Builder").should("exist")
		cy.contains("Stage: Alpha").should("exist")
		cy.contains("no items yet").should("exist")
		cy.contains("Add new item +").should("exist")
	})
})
