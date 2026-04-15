import { test, expect } from '../../test-setup/fixtures';
import { LoginPage } from '../../src/pages/login.page';
import { ContactsPage } from '../../src/pages/contacts.page';
import { ContactCreatePage } from '../../src/pages/contact-create.page';

test.describe('Cogmento - Contacts', () => {
    test('Create contact with most of the fields and verify creation', async ({ page }) => {
        // Test data (recorded values)
        const baseUrl = 'https://ui.freecrm.com/';
        const loginEmail = 'shiva.pasunuri@qualizeal.com';
        const loginPassword = 'Singam@1308';

        const contact = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'shiva.pasunuri@qualizeal.com',
            number: 'text',
            streetAddress: 'desired address',
        };

        // 1) Login (covers navigate + email + password + login click)
        const loginPage = new LoginPage(page);
        await loginPage.login(loginEmail, loginPassword, baseUrl);

        // 2) Open Contacts and click Create
        const contactsPage = new ContactsPage(page);
        await contactsPage.openContacts();

        // NOTE: Recorded Step 4 (Click 'Contacts') is effectively covered by openContacts().
        // The recorded Step 4 is skipped as a standalone step due to missing locator/playwrightStep mapping in the plan.
        // Step 11 is used for the Create action.
        await contactsPage.clickCreate();

        // 3) Create contact with most of the fields
        const contactCreatePage = new ContactCreatePage(page);
        await contactCreatePage.createContact(contact);

        // 4) Verify contact created
        const pageContent = await contactCreatePage.getPageContent();
        expect(pageContent).toContain(contact.email);
        expect(pageContent).toContain(`${contact.firstName} ${contact.lastName}`);
    });
});
