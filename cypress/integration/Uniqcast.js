///<reference types="cypress" />


describe('Uniqcast test', () => {

    beforeEach('Visit URL', () => {
        cy.visit('/')
    })

    it('1-Successful Log in', () => {
        
        cy.get('[type="text"]').click().type('qauser')
        cy.get('[type="password"]').click().type('1234')
        cy.get('[type="submit"]').click()
        cy.url().should('include', '/dashboard')
    })

    it('2-Failed Log in', () => {

        cy.get('[type="text"]').click().type('Qauser')
        cy.get('[type="password"]').click().type('1234')
        cy.get('[type="submit"]').click()
        cy.get('.info-paragraph').should('contain',' incorrect.')

    })

    it('3-Log in when both fields are empty', () => {

        cy.get('[type="submit"]').click()
        cy.get('.info-paragraph').then( message =>{
            expect(message.text()).to.equal('Please enter username and password.')
        })
    })
        
    it('4-Search Bar magnifier icon - failing test', () => {
        cy.loginToApp()
        cy.url().should('include', '/dashboard')

        cy.get('[type="search"]').click().type('demolition')
        //redirects to Login page
        cy.get('.header-form.ng-dirty > .action-icon > .actual-icon').click()
        cy.wait(2000)
        cy.get('div')
        cy.url().should('contain', '/search;keyword=demolition')
        
    })

    it('5-Menu(top right) leads to correct destinations', () => {
        cy.loginToApp()
        cy.url().should('include', '/dashboard')

        cy.get('button#uniq-menu').then( menu => {
            cy.wrap(menu).click()
            cy.contains('All Channels').click()
            cy.url().should('include', '/#/app/list/live')
            cy.wrap(menu).click()
            cy.contains('All Movies').click()
            cy.url().should('include', '/#/app/list/vod')
            cy.wrap(menu).click()
            cy.contains('User').click()
            cy.url().should('include', '/#/app/user')
            cy.wrap(menu).click()
            cy.contains('Logout').click()
            cy.url().should('include', '/#/')
        })
    })

    it('6-User button (top right, left of the Menu button) opens the User page', () => {
        cy.loginToApp()
        cy.url().should('include', '/dashboard')

        cy.get('a#uniq-profile').click()
        cy.url().should('include', '/#/app/user')
    })

    it('7-Unlockin content with parental Pin', () => {
        cy.loginToApp()
        cy.get(':nth-child(2) > .poster > .poster-details > .icon').click()
        cy.get('[type="password"]').click().type('1234')
        cy.get('[type="submit"]').click()
        cy.url().should('include', '/#/app/details/live')
    })

    it('8-Navigating to movie details page', () => {
        cy.loginToApp()
        cy.contains('Lars the Emo Kid').click()
        cy.get('.title').should('have.text', 'Lars the Emo Kid')
    })

    it('9-failing to change parental PIN', () => {
        cy.loginToApp()

        cy.contains('Change Parental PIN').click()
        cy.get('[name="pin-old"]').click().type('1223')
        cy.get('[name="pin-new"]').click().type('2222')
        cy.get('[name="pin-repeat"]').click().type('2222')
        cy.get('[type="submit"]').click()
        cy.get('.info-paragraph').should('contain', 'PIN')

    })

    it.only('10-Adding to favorites', () => {
        cy.loginToApp()
        cy.url().should('include', '/dashboard')

        cy.get('.active > .banner > .primary').click()
        cy.get('.actions > :nth-child(4)').then( favorite =>{
            cy.wrap(favorite).click()
            expect(favorite.text()).to.equal('Favorited')
        })
    })


})

   
