import 'expect-puppeteer';

describe('Page contens of ultebra', () => {
  beforeAll(async () => {
    // Arrange
    await page.goto('https://www.ultebra.eu/');
  });

  it('should have title Ultebra', async () => {
    // Act
    const actual = await page.title();
    // Assert
    const expected = 'Ultebra';
    expect(actual).toContain(expected);
  });

  it('should have CEO name', async () => {
    // Act
    // Assert
    const expected = 'Román';
    await expect(page).toMatch(expected);
  });

  it('should have Servicios section', async () => {
    // Act
    const actualNode = await page.$('#services');
    const actual = await page.evaluate(node => node.innerHTML, actualNode);
    // Assert
    const expected = 'Servicios';
    expect(actual).toContain(expected);
  });
});
