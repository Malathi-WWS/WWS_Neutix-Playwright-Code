
import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.dashboardHeading = page.getByRole('heading', {
      name: 'Home Dashboard'
    });

    this.myTicketsLink = page.getByRole('link', {
      name: /My Tickets/
    });

    this.logoutButton = page.getByRole('button', {
      name: /Logout/
    });

    this.confirmationHeading = page.getByRole('heading', {
      name: 'Confirmation'
    });

    this.confirmLogoutButton = page.getByRole('button', {
      name: 'Logout',
      exact: true
    }).last();
  }

  async expectDashboardVisible() {
    await expect(this.dashboardHeading).toBeVisible();
  }

  async openMyTickets() {
    await this.myTicketsLink.click();

    await expect(this.page).toHaveURL(/mytickets/i);
  }

  async logout() {
    await this.logoutButton.first().click();

    await expect(this.confirmationHeading).toBeVisible();

    await this.confirmLogoutButton.click();
  }
}
