const { test, expect} = require("@playwright/test");

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
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    
   const allBooks = await page.$('a[href="/catalog"]');
   const isAllBooksVisible = await allBooks.isVisible();
   expect(isAllBooksVisible).toBe(true);

});

test('Verify That the "My Books" Link Is Visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
   const myBooks = await page.$('a[href="/profile"]');
   const isMyBooksVisible = await myBooks.isVisible();
   expect(isMyBooksVisible).toBe(true);

});

test('Verify That the "Add Books" Link Is Visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]')
   const addBooks = await page.$('a[href="/create"]');
   const isAddBooksVisible = await addBooks.isVisible();
   expect(isAddBooksVisible).toBe(true);

});

test('Verify That the user email address is Visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]')
   const email = await page.$('#user > span');
   const isUserEmailVisible = await email.isVisible();
   expect(isUserEmailVisible).toEqual(true);

});

test('Login with valid credentials', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');

   expect(page.url()).toBe('http://localhost:3000/catalog');

});

test('Submit the Form with Empty Input Fields', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]')
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
   expect(page.url()).toBe('http://localhost:3000/login');

});

test('Submit the Form with Empty Email Input Field', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]')
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
   expect(page.url()).toBe('http://localhost:3000/login');

});

test('Submit the Form with Empty Password Input Field', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', '123456');
    await page.click('input[type="submit"]')
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
   expect(page.url()).toBe('http://localhost:3000/login');

});

test('Submit the Register Form with Valid Values', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'sofi@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456')
    await page.click('input[type="submit"]')
    await page.$('a[href="/catalog"]');

   expect(page.url('http://localhost:3000/catalog'));
});

test('Submit the Register Form with Empty Input Fields', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.click('#register-form > fieldset > input')
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');
   expect(page.url()).toBe('http://localhost:3000/register');

});

test('Submit the Register Form with Empty Email Input Field', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="password"]', '123456');
    await page.click('#register-form > fieldset > input');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');
   expect(page.url()).toBe('http://localhost:3000/register');

});

test('Submit the Register Form with Empty Password Input Field', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'sofi@abv.bg');
    await page.click('#register-form > fieldset > input');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
   expect(page.url()).toBe('http://localhost:3000/register');

});

test('Submit the Register Form with Empty Confirm Password Input Field', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'sofi@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('#register-form > fieldset > input');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
   expect(page.url()).toBe('http://localhost:3000/register');

});

test('Submit the Register Form with Empty Different Password Input Field', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'sofi@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123457');
    await page.click('#register-form > fieldset > input');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
   expect(page.url()).toBe('http://localhost:3000/register');

});

test('Add book with correct data', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
     page.click('input[type="submit"]'),
     page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://w7.pngwing.com/pngs/194/920/png-transparent-wall-black-crack-white-hand-festive-elements-thumbnail.png');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form > fieldset > input')

    await page.waitForURL('http://localhost:3000/catalog');
    expect(page.url()).toBe('http://localhost:3000/catalog');

});

test('Add book with empty title fields', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
     page.click('input[type="submit"]'),
     page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://w7.pngwing.com/pngs/194/920/png-transparent-wall-black-crack-white-hand-festive-elements-thumbnail.png');
    await page.selectOption('#type', 'Fiction');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })

    await page.$('a[href="/create"]')
     expect(page.url()).toBe('http://localhost:3000/create');

});

test('Add book with empty description fields', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');

    await Promise.all([
     page.click('input[type="submit"]'),
     page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#image', 'https://w7.pngwing.com/pngs/194/920/png-transparent-wall-black-crack-white-hand-festive-elements-thumbnail.png');
    await page.selectOption('#type', 'Fiction');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })

    await page.$('a[href="/create"]')
     expect(page.url()).toBe('http://localhost:3000/create');

});

test('Add book with empty URL fields', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');

    await Promise.all([
     page.click('input[type="submit"]'),
     page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.selectOption('#type', 'Fiction');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('Alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })

    await page.$('a[href="/create"]')
     expect(page.url()).toBe('http://localhost:3000/create');

});

test('Login and verify all Books Are Displayed', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');

    await Promise.all([
     page.click('input[type="submit"]'),
     page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const bookElement = await page.$$('.other-books-list li');
    expect(bookElement.length).toBeGreaterThan(0);
});

test("Verify That No Books Are Displayed", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL("http://localhost:3000/catalog"),
  ]);
  await page.waitForSelector("#dashboard-page");

  const noBookMessage = await page.$$(".no-books");
  expect(noBookMessage).toBe("No Books in the Database!");
});

test("Verify That Logged-In User Sees Details Button and Button Works Correctly", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
  
    await Promise.all([
      page.click('input[type="submit"]'),
      page.waitForURL("http://localhost:3000/catalog"),
    ]);
    await page.click('a[href="/catalog"]')
    await page.waitForSelector(".otherBooks");

    await page.click('.otherBooks a.button')
    await page.waitForSelector(".book-information");

    const detailsPageTitle = await page.textContent(".book-information h3");
    expect(detailsPageTitle).toBe("Test Book");
  });

  
test("Verify That Guest User Sees Details Button and Button Works Correctly", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
   
    await page.click('a[href="/catalog"]')
    await page.waitForSelector(".otherBooks");

    await page.click('.otherBooks a.button')
    await page.waitForSelector(".book-information");

    const detailsPageTitle = await page.textContent(".book-information h3");
    expect(detailsPageTitle).toBe("Test Book");
  });



  test("Verify That the logout button redirects correctly", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');
      
    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectURL = page.url();
    expect(redirectURL).toBe('http://localhost:3000/catalog');
  });

