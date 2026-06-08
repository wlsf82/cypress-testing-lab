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

  it('shows the signature preview after signing it', () => {
    cy.get('#signature-textarea').type('John Doe')

    cy.contains('em#signature', 'John Doe')
      .should('be.visible')
  })

  it('shows and hides the signature preview after signing it', () => {
    cy.get('#signature-textarea-with-checkbox').type('Joe')

    cy.get('#signature-checkbox').check()

    cy.contains('em#signature-triggered-by-check', 'Joe')
      .should('be.visible')

    cy.get('#signature-checkbox').uncheck()

    cy.contains('em#signature-triggered-by-check', 'Joe')
      .should('not.exist')
  })
})
