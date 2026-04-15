import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class ContactsPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    async waitForContactsPage(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async openContacts(): Promise<void> {
        this.logStep('Open Contacts');
        await ActionUtils.click(this.page.getByRole('link', { name: '/uf0c0 Contacts' }), { page: this.page });
        await this.waitForContactsPage();
    }

    async clickCreate(): Promise<void> {
        this.logStep('Click Create (Contacts)');
        await ActionUtils.click(this.page.getByRole('link', { name: 'Create' }), { page: this.page });
        await this.page.waitForLoadState('networkidle');
    }
}
