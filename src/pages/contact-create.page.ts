import { expect, Page, Browser, BrowserContext, Locator } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class ContactCreatePage extends BasePage {
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly contactEmailAddressField: Locator;
    private readonly contactNumberField: Locator;
    private readonly streetAddressField: Locator;
    private readonly saveButton: Locator;

    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
        this.firstNameField = this.page.locator('input[name="first_name"]');
        this.lastNameField = this.page.locator('input[name="last_name"]');
        this.contactEmailAddressField = this.page.getByRole('textbox', { name: 'Email address' });
        this.contactNumberField = this.page.getByRole('textbox', { name: 'Number' });
        this.streetAddressField = this.page.getByRole('textbox', { name: 'Street Address' });
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
    }

    async fillFirstName(firstName: string): Promise<void> {
        await ActionUtils.fill(this.firstNameField, firstName, { page: this.page });
    }

    async fillLastName(lastName: string): Promise<void> {
        await ActionUtils.fill(this.lastNameField, lastName, { page: this.page });
    }

    async fillContactEmailAddress(email: string): Promise<void> {
        await ActionUtils.fill(this.contactEmailAddressField, email, { page: this.page });
    }

    async fillNumber(number: string): Promise<void> {
        await ActionUtils.fill(this.contactNumberField, number, { page: this.page });
    }

    async fillStreetAddress(streetAddress: string): Promise<void> {
        await ActionUtils.fill(this.streetAddressField, streetAddress, { page: this.page });
    }

    async clickSave(): Promise<void> {
        await ActionUtils.click(this.saveButton, { page: this.page });
    }

    async createContact(contact: {
        firstName: string;
        lastName: string;
        email: string;
        number: string;
        streetAddress: string;
    }): Promise<void> {
        await this.fillFirstName(contact.firstName);
        await this.fillLastName(contact.lastName);
        await this.fillContactEmailAddress(contact.email);
        await this.fillNumber(contact.number);
        await this.fillStreetAddress(contact.streetAddress);
        await this.clickSave();
        await this.page.waitForLoadState('networkidle');
    }

    async assertContactCreated(expectedNameOrEmail: string): Promise<void> {
        const content = await this.getPageContent();
        expect(content).toContain(expectedNameOrEmail);
    }
}
