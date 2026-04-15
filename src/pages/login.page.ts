import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class LoginPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    async navigateToBaseUrl(url: string): Promise<void> {
        await this.navigateTo(url);
    }

    async fillEmail(email: string): Promise<void> {
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Email' }), email, { page: this.page });
    }

    async fillPassword(password: string): Promise<void> {
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Password' }), password, { page: this.page });
    }

    async clickLogin(): Promise<void> {
        await ActionUtils.click(this.page.getByText('Login'), { page: this.page });
    }

    async login(email: string, password: string, baseUrl: string = 'https://ui.freecrm.com/'): Promise<void> {
        await this.navigateToBaseUrl(baseUrl);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
        await this.page.waitForLoadState('networkidle');
    }
}
