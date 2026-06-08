describe('Cypress Playground', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('asserts the subscribe button is visible using `cy.get` and `cy.contains`', () => {
    cy.get('button[type="submit"]').should('be.visible')
    cy.contains('button', 'Subscribe').should('be.visible')
  })
})
