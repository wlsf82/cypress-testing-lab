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

  it('turns it OFF, then ON again', () => {
    cy.get('input[type="radio"]')
      .check('off')

    cy.contains('p#on-off', 'OFF').should('be.visible')

    cy.get('input[type="radio"]')
      .check('on')

    cy.contains('p#on-off', 'ON').should('be.visible')
  })

  it('selects "Basic" by its content', () => {
    cy.get('select#selection-type')
      .select('Basic')

    cy.contains('p', "You've selected: BASIC")
      .should('be.visible')
  })

  it('selects "Standard" by its value', () => {
    cy.get('select#selection-type')
      .select('standard')

    cy.contains('p', "You've selected: STANDARD")
      .should('be.visible')
  })

  it('selects "VIP" by its index', () => {
    cy.get('select#selection-type')
      .select(3)

    cy.contains('p', "You've selected: VIP")
      .should('be.visible')
  })

  it('selects a few fruits', () => {
    cy.get('select[multiple]')
      .select([
        'apple',
        'banana',
        'elderberry'
      ])

    cy.contains(
      'p#fruits-paragraph',
      "You've selected the following fruits: apple, banana, elderberry"
    ).should('be.visible')
  })

  it('successfully uploads a fixture file', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json')

    cy.contains(
      'p#file',
      'The following file has been selected for upload: example.json'
    ).should('be.visible')
  })

  it('successfully retrieves TODO', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1')
      .as('getTodo')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@getTodo')

    cy.contains('ul li', 'TODO ID: 1').should('be.visible')
    cy.contains('ul li', 'Title:').should('be.visible')
    cy.contains('ul li', 'Completed:').should('be.visible')
    cy.contains('ul li', 'User ID:').should('be.visible')
  })

  it('successfully retrieves a mocked TODO', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { fixture: 'todo' }
    ).as('getMockedTodo')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@getMockedTodo')

    cy.contains('ul li', 'TODO ID: 1').should('be.visible')
    cy.contains('ul li', 'Title: my custom todo').should('be.visible')
    cy.contains('ul li', 'Completed: true').should('be.visible')
    cy.contains('ul li', 'User ID: 7').should('be.visible')
  })

  it('shows an error when the GET TODO API call fails', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { statusCode: 500 }
    ).as('serverFailure')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@serverFailure')
      .its('response.statusCode')
      .should('be.equal', 500)

    cy.contains(
      '.error',
      'Oops, something went wrong. Refresh the page and try again.'
    ).should('be.visible')
  })

  it('shows an error when trying to GET a TODO without internet connection', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { forceNetworkError: true }
    ).as('networkFailure')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@networkFailure')

    cy.contains(
      '.error',
      'Oops, something went wrong. Check your internet connection, refresh the page, and try again.'
    ).should('be.visible')
  })

  it('gets a TODO making a HTTP request directly', () => {
    cy.request(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1'
    ).its('status').should('be.equal', 200)
  })

  Cypress._.times(10, index => {
    it(`selects ${index + 1} out of 10`, () => {
      cy.get('input[type="range"]')
        .invoke('val', index + 1)
        .should('have.value', index + 1)
        .trigger('change')

      cy.contains('p', `You're on level: ${index + 1}`)
        .should('be.visible')
    })
  })

  it('successfully selects a date', () => {
    cy.get('input[type="date"]')
      .type('2026-04-15')
      .blur()

    cy.contains(
      'p#date-paragraph',
      "The date you've selected is: 2026-04-15"
    ).should('be.visible')
  })

  it('shows and hides the typed password', () => {
    cy.env(['password']).then(({ password }) => {
      cy.get('input[type="password"]').type(password)

      cy.get('#show-password-checkbox').check()

      cy.get('input[type="password"]').should('not.exist')
      cy.get('input[type="text"]').should('be.visible')

      cy.get('#show-password-checkbox').uncheck()

      cy.get('input[type="password"]').should('be.visible')
      cy.get('input[type="text"]').should('not.exist')
    })
  })
})
