
import { test } from '../fixtures/test-fixtures.js';

test('Neutix Smoke Test', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  // 1. Open application
  await loginPage.open();

  // 2. Login with test credentials
  await loginPage.login(
    process.env.NEUTIX_EMAIL,
    process.env.NEUTIX_PASSWORD
  );

  // 3. Verify OTP
  const otp = process.env.NEUTIX_OTP;

  if (!otp || !/^\d{6}$/.test(otp)) {
    throw new Error(
      'Please set NEUTIX_OTP to a valid six-digit OTP.'
    );
  }

  await loginPage.verifyOtp(otp);

  // 4. Verify dashboard
  await dashboardPage.expectDashboardVisible();

  // 5. Navigate to My Tickets
  await dashboardPage.openMyTickets();

  // 6. Logout
  await dashboardPage.logout();

  // 7. Verify successful logout
  await loginPage.expectLoggedOut();
});





// import { test, expect } from '@playwright/test';


// test('test', async ({ page }) => {
//   await page.goto('https://testing.neutix.com/');
//   await page.getByRole('textbox', { name: 'Email Address' }).fill('tm.stt@wonderws.com');
//   await page.getByRole('textbox', { name: 'Password' }).fill('Test@1234');


// await page.getByRole('button', { name: 'Sign In', exact: true }).click();

// await expect(page.locator('#otp-0')).toBeVisible({
//   timeout: 15000
// });

//   await page.locator('#otp-0').fill('1');
//   await page.locator('#otp-1').fill('1');
//   await page.locator('#otp-2').fill('1');
//   await page.locator('#otp-3').fill('1');
//   await page.locator('#otp-4').fill('1');
//   await page.locator('#otp-5').fill('1');

//   await page.getByRole('button', { name: 'Verify' }).click();

//  await expect(
//   page.getByRole('heading', { name: 'Home Dashboard' })
// ).toBeVisible();

// // Verify My Tickets navigation
// await page.getByRole('link', { name: /My Tickets/ }).click();

// await expect(page).toHaveURL(/\/mytickets/);

// // Click Logout in the sidebar
// await page.getByRole('button', { name: /Logout/ }).first().click();

// // Confirm logout in the dialog
// await page.getByRole('heading', { name: 'Confirmation' })
//   .waitFor({ state: 'visible' });

// await page.getByRole('button', { name: 'Logout', exact: true }).last().click();

// // Verify successful logout
// await expect(
//   page.getByRole('heading', { name: 'Sign In' })
// ).toBeVisible();



// });