import { test, expect, chromium } from "@playwright/test";
import { beforeEach, describe } from "node:test";
import { setupHooks, getPage, getContext } from "../pages/hooks";
import { checkFooter } from "../pages/checkingFooter";
import selectorAssociationPage from "../fixture/selectorAssociationPage.json"

setupHooks();

test.describe("cheking association page", async () => {
    let page;
    let context;
    let checkFooterInstance;
    test.beforeEach(async () => {
        context = getContext();
        page = getPage();
        checkFooterInstance = new checkFooter(page)
    })

    test('checking the association Page', async () => {
        // Access the homepage 
        await checkFooterInstance.goto();

        //Click on the Association tab in the navigation bar.
        await page.getByRole(selectorAssociationPage.associationOnglet.locator,
            selectorAssociationPage.associationOnglet.option).click();
        // Verify that link redirect to the correct page
        await expect(page).toHaveURL('https://www.frequencies.fr/association')
        
        // Store the 'Nous soutenir' button in the const button
        const button = await page.getByRole(selectorAssociationPage.nousSoutenirButton.locator,
            selectorAssociationPage.nousSoutenirButton.option)
        // Monitor the opening of a new tab
        const [newTab] = await Promise.all([
            context.waitForEvent('page'),
            button.click()
        ])

        // Wait for the new tab to load
        await newTab.waitForLoadState();

        // Check the URL of the opened tab
        const currentUrl = newTab.url();

        if (currentUrl === 'https://frequencies.assoconnect.com/collect/description/340064-c-collecte-de-dons-pour-frequencies') {
            console.log(`Test réussie`)
        } else {
            console.log(`Test échoué: url inattendue: ${currentUrl}`)
        }

         // Close the tab
        await newTab.close();

        // Click on the "devenir sponsor" button 
        await page.getByRole(selectorAssociationPage.devenirSponsorButton.locator,
                            selectorAssociationPage.devenirSponsorButton.option).click();
        // Click on the "voir tous nous partenaire button"
        await page.getByRole(selectorAssociationPage.voirPartenairButton.locator, 
                            selectorAssociationPage.voirPartenairButton.option).click();
    })
})

