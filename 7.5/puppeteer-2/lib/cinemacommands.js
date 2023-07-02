module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (el) => el.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
  
  clickOnSelectedPlaceByIndex: async function (page, rowIndex, placeIndex) {
    await page.waitForSelector('[class="buying-scheme__wrapper"]'); 
    const rowSelector = await page.$$('[class="buying-scheme__row"]');
    const placeSelector = await rowSelector[rowIndex].$$('[class*="buying-scheme__chair"]');
    try {
      await placeSelector[placeIndex].click();
    } catch (error) {
      throw new Error(`Selector is not clickable: ${placeSelector[placeIndex]}`);
    }
  },
};