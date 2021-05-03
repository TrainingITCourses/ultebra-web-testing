import puppeteer from 'puppeteer';
import * as settings from '../config/settings.json';

(async () => {
  const browser = await puppeteer.launch(settings.puppeteer);
  const page = await browser.newPage();
  await page.goto(settings.baseURL);
  await page.emulate(puppeteer.devices['iPhone X']);

  const title = await page.title();
  const metrics = await page.metrics();

  const performance = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance)));

  const firstPaint = JSON.parse(
    await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByName('first-paint')[0].startTime)
    )
  );

  const firstContentfulPaint = JSON.parse(
    await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByName('first-contentful-paint')[0].startTime)
    )
  );

  const accessibility = await page.accessibility.snapshot();
  console.log(accessibility);

  const auditory = { title, metrics, performance, firstPaint, firstContentfulPaint };

  await page.screenshot({ path: './output/screenshot-iPhoneX.png', type: 'png', fullPage: true });

  console.log(JSON.stringify(auditory));

  await page.close();
  await browser.close();
})();
