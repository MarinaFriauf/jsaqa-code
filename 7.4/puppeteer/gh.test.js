const jestConfig = require("./jest.config");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  }, 10000);

afterEach(() => {
  page.close();
}, 10000);

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 10000);
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toMatch("Get started with Team")
  },10000);
});

  describe("Other page explore", () => {
    beforeEach(async () => {
      await page.goto("https://github.com/explore");
    }, 10000);
    test("The header content Explore", async () => {
      const title = await page.title();
      expect(title).toEqual(
        "Explore GitHub · GitHub"
      );
    }, 10000);
    
        test("Click on Topics button", async () => {
          const topicsButton = await page.waitForSelector('a[data-selected-links*="topics_path"]');
          await topicsButton.click();
          await page.waitForSelector('.f3.lh-condensed.text-center.Link--primary');
          const currentUrl = await page.url();
          expect(currentUrl).toContain("https://github.com/topics");
        }, 10000);
      });    
      describe("Open marketplace page", () => {
        beforeEach(async () => {
          await page.goto("https://github.com/marketplace");
        }, 10000);
        test("The header content Marketplace", async () => {
          const title = await page.title();
          expect(title).toEqual(
            "GitHub Marketplace · to improve your workflow · GitHub"
          );
        }, 10000);  
  });
