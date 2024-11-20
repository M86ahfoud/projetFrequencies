import  {chromium, test } from "@playwright/test";

let browser;
let context;
let page

module.exports = {
    setupHooks: () => {
        test.beforeAll(async ()=> {

            browser = await chromium.launch();
            context = await browser.newContext()
            
        });

        test.beforeEach(async() => {
            page = await context.newPage();
        })

        test.afterEach(async() => {
            await page.close()
        });

        test.afterAll(async() => {
            await browser.close()
        })
    },

    getBrowser: () => browser,
    getContext: () => context,
    getPage: () => page
};