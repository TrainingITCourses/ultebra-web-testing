import puppeteer from 'puppeteer';

// https://chercher.tech/puppeteer/alerts-puppeteer

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
  });
  await page.goto('https://chercher.tech/practice/popups');
  await page.click("input[name='alert']");
  await browser.close();
}
run();
