//test1: Register Page
context('Check the working of Register', () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it('contains "Register" in the title', () => {
        cy.get('[data-cy="reg-heading"]').should("have.text","Register");
    });

    it('Check Empty Fields',()=>{
        cy.get('[data-cy="signup-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", " Empty Fields detected ");
    });

    it('Check Invalid First Name',()=>{
        cy.get('[data-cy="register-first-name"]').type('abc')
        cy.get('[data-cy="signup-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", " First Name should have only first letter Capital and remaining letters in lowercase (Only Alphabets allowed) ");
    });

    it('Check Invalid Last Name',()=>{
        cy.get('[data-cy="register-first-name"]').type('Abc');
        cy.get('[data-cy="register-last-name"]').type('xyz');
        cy.get('[data-cy="signup-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", " Last Name should have only first letter Capital and remaining letters in lowercase (Only Alphabets allowed) ");
    });

    it('Check Invalid City Name',()=>{
        cy.get('[data-cy="register-first-name"]').type('Abc');
        cy.get('[data-cy="register-last-name"]').type('Xyz');
        cy.get('[data-cy="register-city-name"]').type('qwe');
        cy.get('[data-cy="signup-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", " City Name should have only first letter Capital and remaining letters in lowercase (Only Alphabets allowed) ");
    });

    it('Check Invalid Age',()=>{
        cy.get('[data-cy="register-first-name"]').type('Abc');
        cy.get('[data-cy="register-last-name"]').type('Xyz');
        cy.get('[data-cy="register-city-name"]').type('Qwe');
        cy.get('[data-cy="register-age"]').type('12');
        cy.get('[data-cy="signup-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", " Age should be greater than 13 ");
    });

    it('Check Invalid Email',()=>{
        cy.get('[data-cy="register-first-name"]').type('Abc');
        cy.get('[data-cy="register-last-name"]').type('Xyz');
        cy.get('[data-cy="register-city-name"]').type('Qwe');
        cy.get('[data-cy="register-age"]').type('21');
        cy.get('[data-cy="register-email"]').type('!bc@gmail.com.');
        cy.scrollTo(0,500);
        cy.wait(1000);
        cy.get('[data-cy="signup-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", " Invalid Email Format ");
    });

    it('Check Invalid Password',()=>{
        cy.get('[data-cy="register-first-name"]').type('Abc');
        cy.get('[data-cy="register-last-name"]').type('Xyz');
        cy.get('[data-cy="register-city-name"]').type('Qwe');
        cy.get('[data-cy="register-age"]').type('21');
        cy.get('[data-cy="register-email"]').type('abc@xyz.com');
        cy.get('[data-cy="register-password"]').type('Abc1');
        cy.scrollTo(0,500);
        cy.wait(1000);
        cy.get('[data-cy="signup-btn"]').click();
        cy.get(".MuiAlert-message").should("have.text", " Invalid Password Format ");
    });

    // it('Check Successful Register',()=>{
    //     cy.get('[data-cy="register-first-name"]').type('Abc');
    //     cy.get('[data-cy="register-last-name"]').type('Xyz');
    //     cy.get('[data-cy="register-city-name"]').type('Qwe');
    //     cy.get('[data-cy="register-age"]').type('21');
    //     cy.get('[data-cy="register-email"]').type('abc@xyz.com');
    //     cy.get('[data-cy="register-password"]').type('Abc@1234');
    //     cy.scrollTo(0,500);
    //     cy.wait(1000);
    //     cy.get('[data-cy="signup-btn"]').click();
    //     cy.wait(3000);
    //     cy.get('[data-cy="logintitle"]').should("have.text", "Login");

    // });

    it('Check Already Registered Alert',()=>{
        cy.get('[data-cy="register-first-name"]').type('Abc');
        cy.get('[data-cy="register-last-name"]').type('Xyz');
        cy.get('[data-cy="register-city-name"]').type('Qwe');
        cy.get('[data-cy="register-age"]').type('21');
        cy.get('[data-cy="register-email"]').type('abc@xyz.com');
        cy.get('[data-cy="register-password"]').type('Abc@123456');
        cy.scrollTo(0,500);
        cy.wait(1000);
        cy.get('[data-cy="signup-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", " User with email address already exists ");

    });

});

//test2: Login Page
context("Check for login credentials", () => {

    beforeEach(() => {
        cy.visit("/login");
    });

    it('contains "Login" in the title', () => {
        cy.get('[data-cy="logintitle"]').should("have.text", "Login");
    });

    it('Check Empty Fields', () => {
        cy.get('[data-cy="login-login-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", "Empty Fields detected");
    });

    it('Check Invalid Email Credentials', () => {
        cy.get('[data-cy="loginemail"]').type('!bc@gmail.com.');
        cy.get('[data-cy="login-login-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", "Invalid Email Entered");
    });

    it('Check Invalid Password Credentials', () => {
        cy.get('[data-cy="loginemail"]').type('abc@xyz.com');
        cy.get('[data-cy="loginpass"]').type('Abc1');
        cy.get('[data-cy="login-login-btn"]').click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", "Invalid Password Entered");
    });

    it('Check Successful Login', () => {
        cy.get('[data-cy="loginemail"]').type('abc@xyz.com');
        cy.get('[data-cy="loginpass"]').type('Abc@1234');
        cy.get('[data-cy="login-login-btn"]').click();
        cy.wait(3000);
        cy.contains('Weather Search');

    });

    it('Should goto Login Page After Logout', () => {
        cy.get('[data-cy="loginemail"]').type('abc@xyz.com');
        cy.get('[data-cy="loginpass"]').type('Abc@1234');
        cy.get('[data-cy="login-login-btn"]').click();
        cy.wait(3000);
        cy.get('[data-cy="header-username"]').click();
        cy.get('[data-cy="header-link-Logout"]').click();
        cy.wait(3000);
        cy.get('[data-cy="logintitle"]').should("have.text", "Login");
    });

});



//test 3: Home Page
context('Check the pressence of app title and app brand', () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it('contains "Weather App" in the title', () => {
        cy.title().should('contain', 'Weather App');
    });

    it('contains "Cloudy" in the header', () => {
        cy.get("#headbrand").should("contain", "Cloudy");
    });
});

//test 4: Search page
context('Check working of Search page', () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it('contains "weather search" ', () => {
        cy.get('[data-cy="search-link"]').click();
        cy.get("#weather-text").should("have.text", "Weather Search");
    });
    it('contains "search weather by" ', () => {
        cy.get('[data-cy="search-link"]').click();
        cy.get("#search").should("have.text", "Search Weather By:");
    });
    it('check working of Dropdown', () => {
        cy.get('[data-cy="search-link"]').click();
        cy.wait(1000);
        cy.get('select[name="weather-by"]').select('City Name')
            .should('have.value', 'city')
        cy.get('select[name="weather-by"]').select('Coordinates')
            .should('have.value', 'Coordinates')
        cy.get('select[name="weather-by"]').select('Zip code')
            .should('have.value', 'Zip')
    });
    it('check working of search for city input', () => {
        cy.get('[data-cy="search-link"]').click();
        cy.get('select[name="weather-by"]').select('City Name')
        cy.get("#city-search").type("chennai");
        cy.get("#city-btn").click();
        cy.wait(1500);
        cy.get("#place").should("have.text", "Chennai");
        cy.wait(500);
        cy.get('select[name="weather-by"]').select('City Name')
        cy.get("#city-btn").click();
        cy.wait(2000);
        cy.get(".MuiAlert-message").should("have.text", "Enter city Name");
        cy.wait(1000);
        cy.get('select[name="weather-by"]').select('City Name')
        cy.get("#city-search").type("jklmn");
        cy.get("#city-btn").click();
        cy.wait(2000);
        cy.get(".MuiAlert-message").should("have.text", "city not found");
    });
    it('check working of search for coordinates input', () => {
        cy.get('[data-cy="search-link"]').click();
        cy.wait(2000);
        cy.get('select[name="weather-by"]').select('Coordinates')
        cy.get("#geo-btn").click();
        cy.wait(2000);
        cy.get(".MuiAlert-message").should("have.text", "Enter latitude and longitude");
        cy.wait(1000);
        cy.get('select[name="weather-by"]').select('Coordinates')
        cy.get("#lat-search").type("1234");
        cy.get("#long-search").type("5678");
        cy.get("#geo-btn").click();
        cy.wait(2000);
        cy.get(".MuiAlert-message").should("have.text", "wrong latitude or longitude entered !!");
    });
    it('check working of search for zip and country code input', () => {
        cy.get('[data-cy="search-link"]').click();
        cy.wait(1000);
        cy.get('select[name="weather-by"]').select('Zip')
        cy.get("#zip-btn").click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", "please enter zip code with country code !!");
        cy.get('[data-cy="search-link"]').click();
        cy.wait(1000);
        cy.get('select[name="weather-by"]').select('Zip code')
        cy.get("#zip-search").type("12345");
        cy.get("#iso-search").type("ok");
        cy.get("#zip-btn").click();
        cy.wait(1000);
        cy.get(".MuiAlert-message").should("have.text", "wrong zip code or country code entered !!");
    });

});

//test 6: Navigation through Header
context('Navigation', () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it('can navigate around the website', () => {
        cy.get('[data-cy="header-link-home"]').click();
        cy.get('li:contains("Home")');
        cy.wait(1000);
        cy.get('[data-cy="header-link-Search"]').click();
        cy.get('li:contains("Search")');
        cy.wait(1000);
        cy.get('[data-cy="header-link-Favourites"]').click();
        cy.get('li:contains("Favourites")');
        cy.wait(1000);
        cy.get('[data-cy="header-link-Login"]').click();
        cy.get('li:contains("Login")');
        cy.wait(1000);
        cy.get('[data-cy="header-link-Register"]').click();
        cy.get('li:contains("Register")');
    });
});



//test 5: viewport
context('Check Responsiveness', () => {
    it('set the viewport size and dimension', () => {
        cy.get('.navbar').should('be.visible')
        cy.viewport(320, 480)

        // the navbar should have collapse since our screen is smaller
        cy.get('.navbar').should('be.visible')
        cy.get('.navbar-toggler').should('be.visible').click()
        cy.get('.navbar').find('ul').should('be.visible')

    });
});

