import { test, expect, selectors } from "@playwright/test";
test('Vérification des éléments du bas de page', async ({ page }) => {
    // Accéder à la page d'acceuil 
    await page.goto('https://www.frequencies.fr/');

    // Liste des sélecteurs pour les élements de bas de page
    const elements = [
        { label: 'adresse', selector: 'footer >> text=Association Frequencies' },
        { label: 'Youtube', selector: 'footer a[aria-label="Visitez notre page Youtube"]' },
        { label: 'Instagram', selector: 'footer a[aria-label="Visitez notre page Instagram"]' },
        { label: 'Facebook', selector: 'footer a[aria-label="Visitez notre page Facebook"]' },
        { label: 'Linkedin', selector: 'footer a[aria-label="Visitez notre page Linkedin"]' },
        { label: 'DeclarationAccessibilité', selector: 'footer >> text=Déclaration d\'accessibilté' },
        { label: 'Changer le mode', selector: 'footer >> text=Light Mode' },
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