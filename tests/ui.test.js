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