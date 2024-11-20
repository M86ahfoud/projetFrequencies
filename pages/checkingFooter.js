
exports.checkFooter = class checkFooter {
    constructor(page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('https://www.frequencies.fr/');
    }
}