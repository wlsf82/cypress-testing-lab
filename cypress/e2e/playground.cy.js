describe('Cypress Playground', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('successfully subscribes to the newsletter', () => {
    cy.contains('button', 'Subscribe').click()

    cy.contains(
      'span#success',
      "You've been successfully subscribed to our newsletter."
    ).should('be.visible')
  })
})
