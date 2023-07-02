const { expect } = require("chai");
const {
  clickElement,
  getText,
  clickOnSelectedPlaceByIndex,
} = require("./lib/cinemacommands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});

describe("Positives Tests ", () => {
  it("should open reservation on chosen date and time", async () => {
    const selectForDate = '[class="page-nav__day-number"]';
    const selectForTime = '[data-seance-id="175"]';
    const expectText = "Терминатор-заржавел";
    const expectText2 = "Начало сеанса: 10:00";
    await page.waitForSelector(selectForDate, { visible: true });
    await clickElement(page, selectForDate);
    await clickElement(page, selectForTime);
    const selectH2 = await getText(page, "h2");
    const selectTime = await getText(page, '[class="buying__info-start"]');
    expect(selectH2).to.contain(expectText);
    expect(selectTime).to.contain(expectText2);
  });

  it("should get e-ticket", async () => {
    const selectSecondFilm = '[data-seance-id="176"]';
    const selectButton = '[class="acceptin-button"]';
    const acceptButton = '[class="acceptin-button"]';
    const expectText = "Электронный билет";

    await clickElement(page, selectSecondFilm);
    await clickOnSelectedPlaceByIndex(page, 0, 0);
    await clickElement(page, selectButton);
    await clickElement(page, acceptButton);
    const textFromPage = await getText(page, '[class="ticket__check-title"]');
    expect(textFromPage).to.contain(expectText);
  });
});

describe("Negative Test", () => {
  it("should not accept an booked seat", async () => {
    const selectFirstFilm = '[data-seance-id="176"]';

    await clickElement(page, selectFirstFilm);
    await clickOnSelectedPlaceByIndex(page, 0, 0);
    const selectButton = await page.$(
      '[class="acceptin-button"][disabled="true"]'
    );
    expect(selectButton).to.exist;
  });
});