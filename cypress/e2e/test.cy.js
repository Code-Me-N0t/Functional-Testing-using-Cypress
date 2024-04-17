/// <reference types="cypress" />

context('Practice', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/')
    })

    it('Registration Form: Existing Email', () => {
        cy.fixture('register').then((data) => {
            const name = data.name
            const email = data.existing_email

            cy.get('#header').should('be.visible')
            cy.get('ul.navbar-nav>li:nth-child(4)>a').click('center')
            
            cy.get('section#form').should('be.visible')

            cy.get('[action="/signup"]').find('[data-qa=signup-name]').type(name)
            cy.get('[action="/signup"]').find('[data-qa=signup-name]').should('have.value', name)
            cy.get('[action="/signup"]').find('[data-qa=signup-email]').type(email)
            cy.get('[action="/signup"]').find('[data-qa=signup-email]').should('have.value', email)
            cy.get('[action="/signup"]').submit()
            cy.get('[action="/signup"]').should('contain', 'Email Address already exist!')
        })
    })

    it('Registration Form: Incorrect Email Format', () => {
        cy.fixture('register').then((data) => {
            const name = data.name
            const invalid_email = data.incorrect_email

            cy.get('#header').should('be.visible')
            cy.get('ul.navbar-nav>li:nth-child(4)>a').click('center')
            
            cy.get('section#form').should('be.visible')

            cy.get('[action="/signup"]').find('[data-qa=signup-name]').type(name)
            cy.get('[action="/signup"]').find('[data-qa=signup-name]').should('have.value', name)
            cy.get('[action="/signup"]').find('[data-qa=signup-email]').type(invalid_email)
            cy.get('[action="/signup"]').find('[data-qa=signup-button]').click('center')
            cy.get('[action="/signup"]').find('input[type="email"]').should('have.prop', 'validity').and('satisfy', (validity) => !validity.valid);
        })
    })

    it('Registration Form: Correct Email Format', () => {
        cy.fixture('register').then((data) => {
            const name = data.name
            const email = data.new_email

            cy.get('#header').should('be.visible')
            cy.get('ul.navbar-nav>li:nth-child(4)>a').click('center')
            
            cy.get('section#form').should('be.visible')

            cy.get('[action="/signup"]').find('[data-qa=signup-name]').type(name)
            cy.get('[action="/signup"]').find('[data-qa=signup-name]').should('have.value', name)
            cy.get('[action="/signup"]').find('[data-qa=signup-email]').type(email)
            cy.get('[action="/signup"]').find('[data-qa=signup-email]').should('have.value', email)
            cy.get('[action="/signup"]').find('[data-qa=signup-button]').click('center')
            
            cy.get('.login-form').wait(1000).should('be.visible')
        })
    })
})
