describe('login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open page', () => {
    cy.contains('Books list').should('be.visible');
    cy.url().should('include', '/localhost:3000');
  });
  
  it('logins user', () => {
    cy.login('test@test.com', 'test');
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
  });
  
  it('fails to login with empty login', () => {
    cy.login(null, 'test');
    cy.get('#mail')
      .then((element) => element[0].checkValidity())
      .should('be.false');
    cy.get('#mail')
      .then((element) => element[0].validationMessage)
      .should('contain', 'Заполните это поле');
  });

  it('fails to login with empty password', () => {
    cy.login('test@test.com', null);
    cy.get('#pass')
      .then((element) => element[0].checkValidity())
      .should('be.false');
    cy.get('#pass')
      .then((element) => element[0].validationMessage)
      .should('contain', 'Заполните это поле');
  });

  it("add book to favorite", () => {
    cy.login("test@test.com", "test");
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
    cy.get('[class="btn btn-warning"]').click();
    cy.visibleText("Book description");
    cy.putText('[id="title"]', "Кот в сапогах");
    cy.putText('[id="description"]', "сказка");
    cy.putText('[id="authors"]', "Шарль Перро");
    cy.get('[id="favorite"]').dblclick();
    cy.get('button[type="submit"]').click();
    cy.visibleText("Delete from favorite");
  });

  it('checks that books are saved in favorites', () => {
    cy.login("test@test.com", "test");
    cy.visibleText("Добро пожаловать test@test.com");
    cy.contains("Favorites").click();
    cy.contains('Кот в сапогах').should("contain", "Delete from favorite");
  });

  it('deleted from favorite', () => {
    cy.login('test@test.com', 'test');
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
    cy.contains('Favorites').click();
    cy.wait(4000);
    cy.contains('Delete from favorite').click();
    cy.contains('Please add some book to favorit on home page!').should('be.visible');
  });
});

