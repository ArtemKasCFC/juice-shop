///<reference types='cypress'/>

describe('Juice shop Sign up and Login', () => {

  let password = Math.random().toString(36).substring(2)
  let email = Math.random().toString(36).substring(2) + '@gmail.com'

  describe('Juice shop sign up and log in by UI', () => {

    beforeEach(() => {
      cy.visit('https://juice-shop.herokuapp.com/#/')
      cy.get('.close-dialog > .mat-button-wrapper > .mat-icon').click()
      cy.get('#navbarAccount').click()
      cy.get('#navbarLoginButton').click()
    })
  
    it('Sign up', () => {
      cy.get('[href="#/register"]').click({force: true})
      cy.get('#emailControl').type(email)
      cy.get('#passwordControl').type(password)
      cy.get('#repeatPasswordControl').type(password)
      cy.get('.mat-select-placeholder').click()
      cy.get('#mat-option-9').click()
      cy.get('#securityAnswerControl').type('JustName')
      cy.get('#registerButton').click()
      cy.url().should('include', 'login')
      cy.get('.mat-simple-snack-bar-content').should('have.text', 'Registration completed successfully. You can now log in.')
    })
  
    it.skip('Log in', () => {
      cy.get('#email').type(email)
      cy.get('#password').type(password)
      cy.get('#rememberMe-input').check({force: true})
      cy.get('#loginButton').click()
      cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted').should('be.visible')
    })
  })
  
  describe('Log in by APi', () => {
    
    it('Log in by API', () => {
      cy.request('POST', 'https://juice-shop.herokuapp.com/rest/user/login', {"email": email, "password": password}).should(res => {
        expect(res.status).eql(200)
        expect(res.body.authentication).has.property('token')
        let token = res.body.authentication.token
        cy.visit('https://juice-shop.herokuapp.com/#/', {
          onBeforeLoad(browser) {
            browser.localStorage.setItem('token', token)
          }
        })
        })
    })
  })
})