/// <reference types="cypress" />

const contentGrid = "[class*='_contentGrid_']"
// note most of these specifically work because data is hardcoded
describe("modal spec", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173")
		cy.contains("Add new item +").click()
	})
	it("loads the modal when the button is clicked", () => {
		cy.contains("Action Types").should("exist")
	})
	it("has a grid with 11 items", () => {
		cy.get(contentGrid).should("exist")
		cy.get(contentGrid).children("[class*='item']").should("have.length", 11)
	})
	it("clicking a category filters those items", () => {
		cy.get("[class*='_categoryList_']").within(() => {
			cy.get("button").contains("Data Entry").click()
		})
		cy.get(contentGrid).should("exist")
		cy.get(contentGrid).children("[class*='item']").should("have.length", 3)
	})
	it("can search by name, case insensitive", () => {
		// chose this one because others have tags
		cy.get("input[name='search']").type("CaPtUrE tAg")
		cy.get(contentGrid).should("exist")
		cy.get(contentGrid).children("[class*='item']").should("have.length", 1)
	})
	it("can search by description, case insensitive", () => {
		cy.get("input[name='search']").type("qr")
		cy.get(contentGrid).should("exist")
		cy.get(contentGrid).children("[class*='item']").should("have.length", 3)
	})
	it("can search by tag, case insensitive", () => {
		cy.get("input[name='search']").type("qC")
		cy.get(contentGrid).should("exist")
		cy.get(contentGrid).children("[class*='item']").should("have.length", 2)
	})
	it("can be added to the stage by clicking an item and clicking the submit button", () => {
		cy.contains("button", /^Add$/).should("be.disabled")
		cy.get(contentGrid).should("exist")
		cy.get(contentGrid).children("[class*='item']").first().click()
		cy.contains("button", /^Add$/).should("not.be.disabled")
		cy.contains("button", /^Add$/).click()
		cy.contains("Action Types").should("not.exist")
	})
})
