const puppeteer = require('puppeteer');

(async () => {
  const url = 'http://localhost/bloco/politica-de-direitos-autorais/';
  console.log(`Pegou a Url`);
  
  try {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    console.log(`Pegou browser`);
    const page = await browser.newPage();
    console.log(`Pegou page`);

    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log(`Page loaded: ${url}`);

    // Extraia o título da página como exemplo
    const title = await page.title();
    console.log(`Page title: ${title}`);

    await browser.close();
  } catch (error) {
    console.error(`Error loading page ${url}:`, error);
  }
})();
