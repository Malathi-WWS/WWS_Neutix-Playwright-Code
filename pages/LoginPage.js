
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', {
      name: 'Email Address'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.signInButton = page.getByRole('button', {
      name: 'Sign In',
      exact: true
    });

    this.otpInputs = Array.from(
      { length: 6 },
      (_, i) => page.locator(`#otp-${i}`)
    );

    this.verifyButton = page.getByRole('button', {
      name: 'Verify'
    });

    this.signInHeading = page.getByRole('heading', {
      name: 'Sign In'
    });
  }

async open() {
  await this.page.goto('https://testing.neutix.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(this.signInHeading).toBeVisible();
}

async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async verifyOtp(otp) {
    await expect(this.otpInputs[0]).toBeVisible({
      timeout: 15000
    });

    for (let i = 0; i < 6; i++) {
      await this.otpInputs[i].fill(otp[i]);
    }

    await this.verifyButton.click();
  }

  async expectLoggedOut() {
    await expect(this.signInHeading).toBeVisible();
  }
}
