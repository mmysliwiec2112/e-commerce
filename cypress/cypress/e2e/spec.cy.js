context("Vist the page", () => {
    beforeEach(() => {
        cy.visit("https://www.amazon.com/")
        cy.get('#nav-logo-sprites')
            .click()
    })

    // main screen buttons tests
    it("deals button", () => {
        cy.contains("Today's Deals")
            .should("exist")
            .click()
    })

    it("customer service button", () => {
        cy.contains("Customer Service")
            .should("exist")
            .click()
        cy.contains("Welcome to Amazon Customer Service")
    })

    it("registry button", () => {
        cy.contains("Registry")
            .should("exist")
            .click()
        cy.contains("Find a registry or gift list")
    })

    it("gift button", () => {
        cy.contains("Gift Cards")
            .should("exist")
            .click()
        cy.contains("Shop the perfect gift card")
    })

    it("sell button", () => {
        cy.contains("Sell")
            .should("exist")
            .click()
        cy.contains("Sell with Amazon")
    })

    // hamburger menu tests
    it("hamburger menu - electronics section", () => {
        cy.get('#nav-hamburger-menu')
            .click()
        cy.contains("Electronics")
            .should("exist")
            .click()
        cy.contains("Accessories & Supplies")
            .should("exist")
            .click()
        cy.contains("Results")
            .should("exist")
    })

    it("hamburger menu - stream music section", () => {
        cy.get('#nav-hamburger-menu')
            .click()
        cy.contains("Amazon Music")
            .should("exist")
            .click()
        cy.contains("Amazon Music Unlimited")
            .should("exist")
            .click()
        cy.contains("Listen in HD, at no extra cost")
            .should("exist")
    })

    // login tests
    it("login screen from main view without login info", () => {
        cy.contains("Hello, sign in")
            .click()
        cy.get("#continue")
            .click()
        cy.contains("Enter your email or mobile phone number")
            .should("exist")
    })

    it("login screen from hamburger menu without login info", () => {
        cy.get('#nav-hamburger-menu')
            .click()
        cy.contains("Hello, sign in")
            .click()
        cy.get("#continue")
            .click()
        cy.contains("Enter your email or mobile phone number")
            .should("exist")
    })

    it("login screen from main view with wrong number", () => {
        cy.contains("Hello, sign in")
            .click()
        cy.get("#ap_email")
            .type("123456789010100110")
        cy.get("#continue")
            .click()
        cy.contains("Incorrect phone number")
            .should("exist")
    })

    it("login screen from main view with wrong email", () => {
        cy.contains("Hello, sign in")
            .click()
        cy.get("#ap_email")
            .type("fake@email.com")
        cy.get("#continue")
            .click()
        cy.contains("We can't find an account with that email address")
            .should("exist")
    
    })

    it("going to create account view", () => {
        cy.contains("Hello, sign in")
            .click()
        cy.contains("Create your Amazon account")
            .click()
        cy.contains("Create account")
            .should("exist")
    })

    // cart tests
    it("cart without products", () => {
        cy.contains("Cart")
            .click()
        cy.contains("Your Amazon Cart is empty")
            .should("exist")
    })

    it("logging in from the cart screen", () => {
        cy.contains("Cart")
            .click()
        cy.contains("Sign in to your account")
            .click()
        cy.get("#continue")
            .click()
        cy.contains("Enter your email or mobile phone number")
            .should("exist")
    })

    it("adding a book to the cart", () => {
        cy.get("#twotabsearchtextbox")
            .type(`Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow{enter}`)
        cy.contains("Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems")
        cy.contains("Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems")
            .click()
        cy.contains("Add to Cart")
            .click()
        cy.contains("Added to Cart")
            .should("exist")
        cy.contains("Cart Subtotal")
            .should("exist")
    })

    it("adding a book to the cart, then proceeding to checkout", () => {
        cy.get("#twotabsearchtextbox")
            .type(`Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow{enter}`)
        cy.contains("Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems")
        cy.contains("Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems")
            .click()
        cy.contains("Add to Cart")
            .click()
        cy.contains("Added to Cart")
            .should("exist")
        cy.contains("Cart Subtotal")
            .should("exist")
        cy.contains("Proceed to checkout (1 item)")
            .click()
        cy.contains("Sign in")
            .should("exist")
    })

    // search tests
    it("search accepts input", () => {
        cy.get("#twotabsearchtextbox")
            .type(`book`)
        cy.get("#twotabsearchtextbox")
            .should('have.value', `book`)
    })

    it("searching for a specified book", () => {
        cy.get("#twotabsearchtextbox")
            .type(`Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow{enter}`)
        cy.contains("Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems")
            .should("exist")
    })

    it("going to the book view after a search", () => {
        cy.get("#twotabsearchtextbox")
            .type(`Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow{enter}`)
        cy.contains("Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems")
            .click()
        cy.contains("Add to Cart")
            .should("exist")
    })

    it("searching two books, one after another", () => {
        cy.get("#twotabsearchtextbox")
            .type(`Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow{enter}`)
        cy.contains("Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems")
        cy.get("#twotabsearchtextbox")
            .type(`Leviathan Thomas Hobbes{enter}`)
        cy.contains("Leviathan by Thomas Hobbes")
            .should("exist")
    })


})