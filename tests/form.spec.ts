import 'expect-puppeteer';

describe('Given: Contact form', () => {
  beforeAll(async () => {
    // Arrange
    await page.goto('https://www.ultebra.eu/');
    await page.waitForSelector('form');
  });
  describe('When: I type my data', () => {
    beforeAll(async () => {
      // Act
      await page.type('#nameContact', 'Alberto Basalo');
      await page.type('#emailContact', 'albertobasalo@hotmail.com');
      await page.click('#sendContact');
    });
    test('Then:', async () => {
      await page.waitForSelector('.success');
      const actual = await page.$eval('.success', el => el.innerHTML);
      // Assert
      const expected = 'OK';
      expect(actual).toContain(expected);
    });
  });
});
