/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })


    it('verifica o titulo da aplicação', function() {

        cy.visit('./src/index.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios e envia o formulário',function() {
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been'
        
        cy.get('input[id="firstName"]').type('Marilia')
        cy.get('input[id="lastName"]').type('Carvalho')
        cy.get('input[id="email"]').type('marilia@teste.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[id="firstName"]').type('Marilia')
        cy.get('input[id="lastName"]').type('Carvalho')
        cy.get('input[id="email"]').type('email')
        cy.get('textarea[id="open-text-area"]').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('input[id="phone"]')
        .type('abcdef')
        .should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[id="firstName"]').type('Marilia')
        cy.get('input[id="lastName"]').type('Carvalho')
        cy.get('input[id="email"]').type('marilia@teste.com')
        cy.get('input[type="checkbox"]').should('be.visible')
        .check('phone').should('be.checked')
        cy.get('textarea[id="open-text-area"]').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })
    it('preeche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('input[id="firstName"]').type('Marilia').should('have.value', 'Marilia')
        .clear().should('have.value','')
        cy.get('input[id="lastName"]').type('Carvalho').should('have.value','Carvalho')
        .clear().should('have.value','')
        cy.get('input[id="email"]').type('marilia@teste.com').should('have.value','marilia@teste.com')
        .clear().should('have.value','')
        cy.get('input[id="phone"]').type('97496959').should('have.value','97496959')
        .clear().should('have.value','')

    })

    it('exibe mensagem de erro ao submeter formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button','Enviar').click()
        cy.get('span[class="error"]').should('be.visible')

    })

    it('envia o formulário com sucesso com um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('button','Enviar').should('be.visible')
        .click()
        cy.get('span[class="success"]').should('be.visible')
    })

    it('seleciona um produto (youtube) por seu texto', function(){
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('youtube')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste teste', {delay: 0})
        cy.contains('button', 'Enviar').should('be.visible')
        .click()
    })

    it('seleciona um produto (mentoria) por seu texto', function(){
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('mentoria')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste, teste')
        cy.contains('button','Enviar').should('be.visible')
        .click()
    })

    it('seleciona um produto(blog) por seu texto', function(){
        cy.get('input[id=firstName]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('blog')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste teste')
        cy.contains('button','Enviar').should('be.visible')
        .click()
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('youtube')
        cy.get('input[type="radio"]').should('be.visible')
        .check('feedback').should('be.checked')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste teste')
        cy.contains('button','Enviar').should('be.visible')
        .click()
        cy.get('span[class="success"]').should('be.visible')
    })

    it('marca o tipo de atendimento "Ajuda"', function(){
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id=email]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('youtube')
        cy.get('input[type="radio"]').should('be.visible')
        .check('ajuda').should('be.checked')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste teste')
        cy.contains('button','Enviar').should('be.visible')
        .click() 
        cy.get('span[class="success"]').should('be.visible')
    })

    it('marca o tipo de atendimento "Elogio"', function(){
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('cursos')
        cy.get('input[type=radio]').should('be.visible')
        .check('elogio').should('be.checked')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste teste teste')
        cy.contains('button','Enviar').should('be.visible')
        .click()
        cy.get('span[class="success"]').should('be.visible')   
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('mentoria')
        cy.get('input[type="radio"]').should('be.visible')
        .check('elogio')
        cy.get('input[type="checkbox"]').should('be.visible')
        .check().should('be.checked')
        .last().uncheck().should('not.be.checked')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste, teste, teste')
        cy.contains('button','Enviar').should('be.visible')
        .click()
        cy.get('span[class="success"]').should('be.visible')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[id="firstName"]').should('be.visible')
        .type('Marilia')
        cy.get('input[id="lastName"]').should('be.visible')
        .type('Carvalho')
        cy.get('input[id="email"]').should('be.visible')
        .type('marilia@teste.com')
        cy.get('select[id="product"]').should('be.visible')
        .select('cursos')
        cy.get('input[type="radio"]').should('be.visible')
        .check('elogio') .should('be.checked')
        cy.get('input[type="checkbox"]').should('be.visible')
        .check('email') .should('be.checked')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('teste teste teste  ')
        cy.get('input[id="file-upload"]').should('be.visible')
        .selectFile('cypress/fixtures/example.json')
        .then(input => {
         expect(input[0].files[0].name).to.equal('example.json')   
        })
        cy.contains('button','Enviar').should('be.visible')
        .click()
        cy.get('span[class="success"]').should('be.visible')
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[id="file-upload"]').should('be.visible')
        .selectFile('cypress/fixtures/example.json',{action: 'drag-drop' })
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        cy.contains('button','Enviar').should('be.visible')
        .click()
        cy.get('span[class="success"]').should('be.visible')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
       cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })
    it('testa a página da política de privacidade de forma independente', function(){
        cy.get('#privacy a ').invoke('removeAttr', 'target')
        cy.get('#privacy a').click()
        cy.get('h1[id="title"]').should('be.visible')
    })

    it('exibe mensagem por 3 segundos', function(){
        cy.clock()
        cy.contains('button', 'Enviar').should('be.visible')
        .click()
        cy.get('span[class="error"]').should('be.visible')
        cy.tick(3000)
        cy.get('span[class="error"]').should('not.be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando invoke', function(){
        cy.get('span[class=success]').should('not.be.visible')
        .invoke('show')
        .should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide').should('not.be.visible')
        cy.get('span[class=error]').should('not.be.visible')
        .invoke('show')
        .should('be.visible').and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide').should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('teste comando invoke', 6)
        cy.get('textarea[id="open-text-area"]').invoke('val', longText)
        .should('have.value', longText)
    })


    })

    
        

    

