import { test, expect, chromium, selectors } from "@playwright/test";
import selectorAcceuilPage from "../fixture/selectorAcceuilPage.json"

test.describe("Verification of links and button on the homepage", async()=> {

    let browser;
    let context;
    let page;
    

    test.beforeAll(async() => {
        browser = await chromium.launch();
        context = await browser.newContext();
        // page = await context.newPage();
    });

    // test.beforeEach( async () => {
       
    // }); 

    test.afterAll(async() => {
        await browser.close()
    });

    test("Checking the Accueil page", async ({ page }) => {

        // Accès au site à travers son adresse 
        await page.goto(selectorAcceuilPage.Url);

        // Vérification of "Découvrir nos histoires" button
        await page.locator(selectorAcceuilPage.selectorButtonDecouvrir).click();

        // Verification of "En savoir plus" button 
        await page.getByRole(selectorAcceuilPage.selectorEnsavoirButton.locator, 
                              selectorAcceuilPage.selectorEnsavoirButton.option).click();

        // Verification of "Faire un don" button
        await page.locator(selectorAcceuilPage.selectorFaireDon).click();

        // verification of "Nous écrire" button
        await page.getByRole(selectorAcceuilPage.selectorNousExcrirButton.locator, 
                              selectorAcceuilPage.selectorNousExcrirButton.option).click();

        // Verification of "Voir TOUT" button
        await page.getByRole(selectorAcceuilPage.selectorVoirToutButton.locator, 
                                selectorAcceuilPage.selectorVoirToutButton.option).click();
        await expect (page).toHaveURL(/.*fictions-sonores/); 
    })
    
})

