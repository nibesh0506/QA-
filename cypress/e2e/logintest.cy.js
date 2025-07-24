describe("login test", () => {
  it.only("valid login test with product checkout", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    cy.get('[data-test="username"]').should("be.visible").type("standard_user");
    cy.get('[data-test="password"]').should("be.visible").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("eq", "https://www.saucedemo.com/v1/inventory.html");
    cy.get(":nth-child(1) > .pricebar > .btn_primary")
      .should("be.visible")
      .and("be.enabled")
      .and("contain", "ADD TO CART")
      .click();
    cy.get('.fa-layers-counter')
    .click()
    cy.url().should('eq','https://www.saucedemo.com/v1/cart.html')

    cy.get('.btn_action')
      .should("be.visible")
      .and("contain", "CHECKOUT")
      .click();

    cy.url().should('eq','https://www.saucedemo.com/v1/checkout-step-one.html')

    cy.get('[data-test="firstName"]').should('be.visible')
    .type('ram')
    cy.get('[data-test="lastName"]').should('be.visible')
    .type('singh')
    cy.get('[data-test="postalCode"]').should('be.visible')
    .type('10900')

    cy.get('.btn_primary')
      .should("be.visible")
      .and("contain", "CONTINUE")
      .click();

    cy.get('.btn_action')
      .should("be.visible")
      .and("contain", "FINISH")
      .click();

      cy.get('.complete-header')
      .should('contain','THANK YOU FOR YOUR ORDER')

      cy.get('#logout_sidebar_link')
      .click({force:true})
  });

  it("invalid login test", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    cy.get('[data-test="username"]').should("be.visible").type("standard");
    cy.get('[data-test="password"]').should("be.visible").type("secret");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Username and password do not match any user in this service"
    );
  });
});
