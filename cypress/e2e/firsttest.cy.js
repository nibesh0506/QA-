describe("FirstTest", () => {
  it("URL Testing", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    cy.url().should("include", "saucedemo")
            .and("contain", "saucedemo");
    //have.text
    //contain.text
    cy.get('.login_logo').should('be.visible')
    .and('exist')
  });
});
