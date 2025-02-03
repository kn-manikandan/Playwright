import { test, expect } from '@playwright/test';
const { chromium, devices } = require('playwright');

test('Signup test for heymax.ai', async () => {
  // Step 1: Define the mobile device to emulate
  const iPhone11 = devices['iPhone 11'];
  //const SamsungM34 = devices['Samsung Galaxy M34 5G'];
  // Step 2: Launch the browser with mobile emulation settings
  const browser = await chromium.launch({ headless: false }); // Set headless to false for debugging
  const context = await browser.newContext({
    ...iPhone11, // Emulate iPhone 11
    locale: 'en-US', // Set language to English
    permissions: ['geolocation'], // Grant permissions if required
  });

  // Step 3: Open a new page in the mobile context
  const page = await context.newPage();

  // Step 4: Navigate to the application
  console.log('Navigating to https://heymax.ai/');
  await page.goto('https://heymax.ai/');

  // Step 5: Verify page title
  const pageTitle = await page.title();
  console.log('Page title:', pageTitle);

  // Step 6: Check if the homepage is loaded correctly
  const isHomeLoaded = await page.locator('text=Welcome to HeyMax').isVisible(); // Adjust the selector to match the actual text
  if (isHomeLoaded) {
    console.log('Homepage loaded successfully.');
  } else {
    console.error('Homepage failed to load.');
  }

  // Step 7: Interact with elements on the page
  // Example: Click a button
  const buttonSelector = 'button:has-text("Get Started")'; // Adjust the selector
  if (await page.locator(buttonSelector).isVisible()) {
    console.log('Clicking "Get Started" button...');
    await page.click(buttonSelector);
  } else {
    console.error('"Get Started" button not found.');
  }

  // Step 8: Fill a form (if applicable)
  // Example: Fill in email input
  const emailInputSelector = 'input[type="email"]'; // Adjust the selector
  if (await page.locator(emailInputSelector).isVisible()) {
    console.log('Filling in email address...');
    await page.fill(emailInputSelector, 'heymaxqa@gmail.com');
  } else {
    console.error('Email input not found.');
  }

  // Step 9: Submit the form
  const submitButtonSelector = 'button:has-text("Submit")'; // Adjust the selector
  if (await page.locator(submitButtonSelector).isVisible()) {
    console.log('Submitting the form...');
    await page.click(submitButtonSelector);
  } else {
    console.error('Submit button not found.');
  }

  // Step 10: Verify post-submission behavior
  const successMessageSelector = 'text=Thank you for signing up'; // Adjust the selector
  if (await page.locator(successMessageSelector).isVisible()) {
    console.log('Form submitted successfully. Success message visible.');
  } else {
    console.error('Form submission failed. Success message not found.');
  }

  // Step 11: Take a screenshot for documentation
  console.log('Taking a screenshot...');
  await page.screenshot({ path: 'heymax-end-to-end-mobile.png', fullPage: true });

  // Step 12: Close the browser
  console.log('Closing the browser...');
  await browser.close();
});
