///<reference types="Cypress"/>

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste')
 
})

