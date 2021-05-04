import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
import * as settings from '../config/settings.json';

(async () => {
  const browser = await puppeteer.launch(settings.puppeteer);
  const page = await browser.newPage();
  await page.goto(settings.baseURL);
  // await page.emulate(puppeteer.devices['iPhone X']);

  const title = await page.title();
  const browserPerformance = JSON.parse(
    await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const firstCPaint = performance.getEntriesByName('first-contentful-paint')[0].startTime;
      const perfRaw = { navigation, firstContentfulPaint: firstCPaint };
      return JSON.stringify(perfRaw);
    })
  );
  const browserMetrics = {
    fetchTime: new Date().toISOString(),
    url: settings.baseURL,
    title,
    browserPerformance,
  };
  console.log(browserMetrics);

  const chromeEndpoint = browser.wsEndpoint();
  const chromeEndpointURL = new URL(chromeEndpoint);
  const options = {
    output: 'json',
    onlyCategories: ['performance'],
    port: chromeEndpointURL.port,
  };
  const lh = await lighthouse(settings.baseURL, options);
  const audits = lh.lhr.audits;
  const lighthouseMetrics = {
    scores: {
      speedIndex: audits['speed-index'].score,
      firstContentfulPaint: audits['first-contentful-paint'].score,
      firstCpuIdle: audits['first-cpu-idle'].score,
      interactive: audits['interactive'].score,
      performance: lh.lhr.categories.performance.score,
    },
    diagnostics: audits['diagnostics'].details.items,
  };
  console.log(lighthouseMetrics);

  // const accessibility = await page.accessibility.snapshot();
  // console.log(accessibility);

  // await page.screenshot({ path: './output/screenshot.png', type: 'png', fullPage: true });

  await page.close();
  await browser.close();
})();
