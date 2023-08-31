import Login from "./PageObject/login"


describe('template spec', () => {

  const loginPage = new Login()
    it('passes', () => {
      cy.visit('https://unsplash.com')
      cy.contains('Log in')
      .should('be.visible')
      .click()
      //cy.get('input[id="user_email"]')

      loginPage.thisEmail().type('orlenkonikolaj01@gmail.com').should('have.value', 'orlenkonikolaj01@gmail.com')
      cy.contains('Password').type('jcPxWJHt0q')
      cy.contains('Login').click()
      cy.get('input[type="submit"]').click()
      cy.get('[data-test="nav-bar-search-form-input"]')
      .type('office')
      .type('{enter}');
      cy.contains('Blog').click()
      cy.contains('Partnerships').click()

      
      
    })
  })