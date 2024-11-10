import { test, expect, chromium } from "@playwright/test";
import { checkFooter } from "../pages/checkingFooter";
import selectorFooter from "../fixture/selectorFooter.json"

test.describe('Vérification des éléments du bas de page', async () => {

    let browser;
    let context;
    let page;
    let checkFooterInstance;

    test.beforeAll(async() => {
        browser = await chromium.launch();
    });

    test.beforeEach(async() => {
        context = await browser.newContext();
        page = await context.newPage();
        checkFooterInstance = new checkFooter(page)
    });

    test.afterAll(async() => {
        await browser.close()
    });

    test('Vérification des éléments du bas de page', async ()=> {
        
        // Accéder à la page d'acceuil 
       await checkFooterInstance.goto();
    
        // Liste des sélecteurs pour les élements de bas de page
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
        // Vérification de la présence et visibilité de chaque élément
        for (const { label, selector } of elements) {
            const element = page.locator(selector);
            await expect(element, `L'élément ${label} devrait être présent et visible`).toBeVisible();
        }

    })

})