import { test, expect, chromium } from "@playwright/test";
import { checkFooter } from "../pages/checkingFooter";
import selectorFooter from "../fixture/selectorFooter.json";
import {setupHooks, getPage, getContext} from "../pages/hooks"

setupHooks();
test.describe('Vérification des éléments du bas de page', async () => {

    let checkFooterInstance; 
    let page;
    let context
    
    test.beforeEach(async ()=> {
        page = getPage(); 
        context = getContext();
        checkFooterInstance = new checkFooter(page);
        // Access the homepage 
        await checkFooterInstance.goto();
    })

    test('Vérification des éléments du bas de page', async () => {

        

        // List of selectors for footer elements
        const elements = [
            { label: 'adresse', selector: selectorFooter.selectoreAdresse },
            { label: 'Youtube', selector: selectorFooter.selectorYoutube },
            { label: 'Instagram', selector: selectorFooter.selectorInstagram },
            { label: 'Facebook', selector: selectorFooter.selectorFacebook },
            { label: 'Linkedin', selector: selectorFooter.selectorLinkedin },
            { label: 'DeclarationAccessibilité', selector: selectorFooter.selectorAccessibilité },
            { label: 'Changer le mode', selector: selectorFooter.selectorChangeMode },
            // { label: 'politique de confidentialité', selector: 'footer >> text=Politique de confidentialité' },
            // { label: 'conditions d\'utilisation', selector: 'footer >> text=Conditions d\'utilisation' },
            // { label: 'droit d\'auteur', selector: 'footer >> text=Droit d\'auteur' },
            // { label: 'téléphone', selector: 'footer >> text=Tél' },
            // { label: 'email', selector: 'footer >> text=Email' },
        ];
        // Verification of the presence and visibility of each element
        for (const { label, selector } of elements) {
            const element = page.locator(selector);
            await expect(element, `L'élément ${label} devrait être présent et visible`).toBeVisible();
        }

    });

    test("Verification of the Footer link and button", async () => {

        // Access the homepage  
        // await checkFooterInstance.goto();

        // Store all buttons and links in array
        const buttons = [
            { selector: 'Visitez notre page Youtube', expectedUrl: 'https://consent.youtube.com/m?continue=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCgxfEuByVQ8X2k5Tk5yVwhg%3Fcbrd%3D1&gl=FR&m=0&pc=yt&cm=2&hl=en&src=1' },
            { selector: 'Visitez notre page Instagram', expectedUrl: 'https://www.instagram.com/frequencies.production/' },
            { selector: 'Visitez notre page Facebook', expectedUrl: 'https://www.facebook.com/frequencies.production' },
            { selector: 'Visitez notre page Linkedin', expectedUrl: 'https://www.linkedin.com/company/frequencies' }
        ];

        // Verify each redirect button or link
        for (const buttonInfo of buttons) {

            const button = await page.getByLabel(buttonInfo.selector);

            console.log(`test en cours pour le bouton: ${buttonInfo.selector}`);

            // Monitor the opening of a new tab
            const [newTab] = await Promise.all([
                context.waitForEvent('page'),
                button.click(),
            ]);

            // Wait for the new tab to load
            await newTab.waitForLoadState();

            // Check the URL of the opened tab
            const currentUrl = newTab.url();
            if (currentUrl === buttonInfo.expectedUrl) {
                console.log(`Test réussi pour${buttonInfo.selector} : le bouton redirige vers ${currentUrl}`);
            } else {
                console.log(`Test échoué pour ${buttonInfo.selector} : URL inattendue - ${currentUrl}`);
            }

            // Close the tab
            await newTab.close();

        }


        // Click on the link of accessibilité  
        await page.getByRole('link', { name: 'Déclaration d\'accessibilté' }).click();

        // Verify that link redirect to the correct page
        await expect(page).toHaveURL('https://www.frequencies.fr/accessibilite');

        // Identify the element affected by the mode change
        const header = page.locator('header'); 

        // Verify the initial mode (light mode)
        await expect (header).toHaveClass(/light-menu/);

        // Click on the button to change the mode
        await page.getByLabel('\'Changer le thème du site :').click();

        // Verify the dark mode after pressing the button. 
        await expect (header).toHaveClass(/dark-menu/);
    })

})