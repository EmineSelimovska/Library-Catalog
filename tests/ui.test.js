const {test, expect} = require('@playwright/test');


test('Verify All books link is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
   const allBooksLink = await page.$('a[href="/catalog"]');
   const isLinkVisible = await allBooksLink.isVisible();
   expect(isLinkVisible).toBe(true);

});


test('Verify Login Button is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
   const loginButton = await page.$('a[href="/login"]');
   const isLoginButtonVisible = await loginButton.isVisible();
   expect(isLoginButtonVisible).toBe(true);

});


test('Verify Register Button is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
   const registerButton = await page.$('a[href="/register"]');
   const isRegisterButtonVisible = await registerButton.isVisible();
   expect(isRegisterButtonVisible).toBe(true);

});

test('Verify That the "All Books" Link Is Visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('#login-form > fieldset > input')
   const allBooks = await page.$('a[href="/catalog"]');
   const isAllBooksVisible = await allBooks.isVisible();
   expect(isAllBooksVisible).toBe(true);

});

test('Verify That the "My Books" Link Is Visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('#login-form > fieldset > input')
   const myBooks = await page.$('a[href="/profile"]');
   const isMyBooksVisible = await myBooks.isVisible();
   expect(isMyBooksVisible).toEqual(true);

});

test('Verify That the "Add Books" Link Is Visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('#login-form > fieldset > input')
   const addBooks = await page.$('a[href="/create"]');
   const isAddBooksVisible = await addBooks.isVisible();
   expect(isAddBooksVisible).toEqual(true);

});

test('Verify That the user email address is Visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('#login-form > fieldset > input')
   const email = await page.$('#user > span');
   const isUserEmailVisible = await email.isVisible();
   expect(isUserEmailVisible).toEqual(true);

});

test('Login with valid credentials', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('#login-form > fieldset > input')
    await page.$('a[href="/catalog"]');
 
   expect(page.url()).toBe('http://localhost:3000/catalog');

});

test('Submit the Form with Empty Input Fields', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.click('#login-form > fieldset > input')
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
   expect(page.url()).toBe('http://localhost:3000/login');

});



