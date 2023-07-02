const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {
  putText,
  getText,
  clickElement,
  clickOnSelectedPlaceByIndex,
} = require("../../lib/cinemacommands.js");
const { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://netology.ru${string}`, {
    setTimeout: 60000,
  });
});

When("user search by {string}", async function (string) {
  return await putText(this.page, "input", string);
});

Then("user sees the course suggested {string}", async function (string) {
  const actual = await getText(this.page, "a[data-name]");
  const expected = await string;
  expect(actual).contains(expected);
});

Given("I am on the reservation page {string}", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 10000,
  });
});

When("I select the date {string}", async function (day) {
  let selectForDate = await this.page.$x(`//*[contains(text(), '${day}')]`);
  return await selectForDate[0].click();
});

When("I select the time {string}", async function (timeBegin) {
  let selectForTime = await this.page.$x(
    `//*[contains(text(), '${timeBegin}')]`
  );
  return await selectForTime[0].click();
});

Then("I should see the movie title {string} и {string}", async function (
  filmName,
  timeBegin
) {
  let selectH2 = await getText(this.page, "h2");
  let selectTime = await getText(this.page, '[class="buying__info-start"]');
  expect(filmName).to.contain(selectH2);
  expect(timeBegin).to.contain(selectTime);
});

When("I choose a seat {string} and click забронировать", async function (
  string
) {
  let selectButton = '[class="acceptin-button"]';
  await clickOnSelectedPlaceByIndex(this.page, 0, string);
  return await clickElement(this.page, selectButton);
});

Then("I should see the e-ticket {string}", async function (string) {
  let textFromPage = await getText(this.page, '[class="ticket__check-title"]');
  expect(string).contain(textFromPage);
});

Then("I click {string}", async function (string) {
  let button = await this.page.$x(`//*[contains(text(), '${string}')]`);
  await clickElement(this.page, button);
});

When("I choose a seat 2 {string}", async function (string) {
  let selectButton = '[class="acceptin-button"]';
  await clickOnSelectedPlaceByIndex(this.page, 0, string);
  return await clickElement(this.page, selectButton);
});

Then("Selector Забронировать is not clickable", async function () {
  let selectButton = await this.page.$(
    '[class="acceptin-button"][disabled="true"]'
  );
  expect(selectButton).to.exist;
});
