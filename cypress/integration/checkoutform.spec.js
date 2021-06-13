import 'cypress-iframe'

describe('stripe checkout form validation', () => {
	it('iframe[data-cy="the-frame"]', () => {
		cy.visit('localhost:3000')
	
		cy.get('#modal-open-button').click()
		cy.get('iframe').should('exist')
	})

  it('get iframe test cypress-iframe exists ', () => {
    cy.visit('localhost:3000')

    //verify that iframe is loaded to selector
    cy.frameLoaded({ url: "https://js.stripe.com/v3/elements-inner-card-e0c93d6bd8dc5b8a350a8aeee90695a0.html#wait=false&style[base][::placeholder][color]=transparent&rtl=false&componentName=cardNumber&keyMode=test&apiKey=pk_test_6pRNASCoBOKtIshFeQd4XMUh&referrer=http%3A%2F%2Flocalhost%3A3000%2F&"})
    cy.iframe('.InputElement').should('exists')
  })

  it('get iframe test cypress-iframe is visible ', () => {
    cy.visit('localhost:3000')

    //verify that iframe is loaded to selector
    cy.frameLoaded({ url: "https://js.stripe.com/v3/elements-inner-card-e0c93d6bd8dc5b8a350a8aeee90695a0.html#wait=false&style[base][::placeholder][color]=transparent&rtl=false&componentName=cardNumber&keyMode=test&apiKey=pk_test_6pRNASCoBOKtIshFeQd4XMUh&referrer=http%3A%2F%2Flocalhost%3A3000%2F&"})
    cy.iframe('.InputElement').should('be.visible')
  })

	it('get iframe test contains form ', () => {
		cy.visit('localhost:3000')

		//verify that iframe is loaded to selector
		cy.frameLoaded({ url: "https://js.stripe.com/v3/elements-inner-card-e0c93d6bd8dc5b8a350a8aeee90695a0.html#wait=false&style[base][::placeholder][color]=transparent&rtl=false&componentName=cardNumber&keyMode=test&apiKey=pk_test_6pRNASCoBOKtIshFeQd4XMUh&referrer=http%3A%2F%2Flocalhost%3A3000%2F&"})
		cy.iframe('.InputElement').find('input[name="cardnumber"]').should('exist')
		cy.get('iframe').contains('form')
	})
	
	it('get iframe frame input[name="cardnumber"]', () => {
		cy.visit('localhost:3000')

		//cy.get('#modal-open-button').click()

		//verify that iframe is loaded to selector
		cy.frameLoaded({ url: "https://js.stripe.com/v3/elements-inner-card-e0c93d6bd8dc5b8a350a8aeee90695a0.html#wait=false&style[base][::placeholder][color]=transparent&rtl=false&componentName=cardNumber&keyMode=test&apiKey=pk_test_6pRNASCoBOKtIshFeQd4XMUh&referrer=http%3A%2F%2Flocalhost%3A3000%2F&"})
		cy.iframe('.InputElement').find('input[name="cardnumber"]').should('exist')
	})
	
	it('get iframe contains should return true', () => {
		cy.visit('localhost:3000')

		//cy.get('#modal-open-button').click()

		//verify that iframe is loaded to selector
		cy.frameLoaded({ url: "https://js.stripe.com/v3/elements-inner-card-e0c93d6bd8dc5b8a350a8aeee90695a0.html#wait=false&style[base][::placeholder][color]=transparent&rtl=false&componentName=cardNumber&keyMode=test&apiKey=pk_test_6pRNASCoBOKtIshFeQd4XMUh&referrer=http%3A%2F%2Flocalhost%3A3000%2F&"})
		cy.iframe('.InputElement').find('input[name="cardnumber"]').contains('form').should('exist')
	})

	it('pseudo element placeholder should be transparent', () => {
		cy.visit('localhost:3000')
	
		// click on button	
		cy.get('#modal-open-button').click() 
		// Submit the form test ::placeholder
		cy.get('*[class^="InputElement"]').focus().should('have.attr', 'placeholder', '1234 1234 1234 1234')
	})

	it('pseudo element placeholder should be transparent after focus then blur', () => {
		cy.visit('localhost:3000')

		cy.get('#modal-open-button').click() 
		cy.get('*[class^="InputElement"]').focus().blur().should('be.visible')
	})
})
