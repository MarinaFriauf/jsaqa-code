Cypress.Commands.add('login', (email, password) => { 
    cy.contains('Log in').click();
    if (email) {
      cy.get('#mail').type(email);
    }
    if (password) {
      cy.get('#pass').type(password);
    }
    cy.contains('Submit').click();
  });
  

  Cypress.Commands.add("visibleText", (text) => {
    return cy.contains(text).should("be.visible", { setTimeout: 6000 });
  });
  
  
  Cypress.Commands.add("putText", (selector, text) => {
    cy.get(selector).type(text, { delay: 100 });
  });
  