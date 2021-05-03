import puppeteer from 'puppeteer';
import * as settings from '../config/settings.json';

(async () => {
  const browser = await puppeteer.launch(settings.puppeteer);
  const page = await browser.newPage();
  await page.goto(settings.baseURL);
  await page.close();
  await browser.close();
})();
