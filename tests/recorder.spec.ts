(async () => {
  await page.goto('https://www.ultebra.eu/');

  await page.setViewport({ width: 2560, height: 1329 });

  await page.waitForSelector('.col-sm-12 > #contact-form #nameContact');
  await page.click('.col-sm-12 > #contact-form #nameContact');

  await page.waitForSelector('.col-sm-12 > #contact-form #emailContact');
  await page.click('.col-sm-12 > #contact-form #emailContact');

  await page.waitForSelector('.col-sm-12 > #contact-form #message');
  await page.click('.col-sm-12 > #contact-form #message');

  await page.waitForSelector('#contact-form > .form-group > .input-group > .content-input > i');
  await page.click('#contact-form > .form-group > .input-group > .content-input > i');

  await page.waitForSelector('.row #sendContact');
  await page.click('.row #sendContact');

  await page.waitForSelector('.col-sm-12 > #contact-form #phoneContact');
  await page.click('.col-sm-12 > #contact-form #phoneContact');

  await page.waitForSelector('.row #sendContact');
  await page.click('.row #sendContact');
  

  await page.waitForSelector('.row #sendContact');
  await page.click('.row #sendContact');
})();
