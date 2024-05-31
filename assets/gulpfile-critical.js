const gulp = require('gulp');
const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cleanCSS = require('gulp-clean-css');

const baseUrl = 'https://lojadacriacao.com.br/';
const apiUrls = [
  `${baseUrl}wp-json/wp/v2/pages`,
  `${baseUrl}wp-json/wp/v2/posts`,
  `${baseUrl}wp-json/wp/v2/categories`,
  `${baseUrl}wp-json/wp/v2/tags`
];

// Tamanho da tela para o Puppeteer (desktop)
const desktopViewport = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
};

// Tamanho da tela para o Puppeteer (dispositivo móvel)
const mobileViewport = {
  width: 375,
  height: 667,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
};

// Função para gerar CSS crítico para uma página
async function generateCriticalCSS(url, fileName, viewport) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Configura a viewport do navegador
  await page.setViewport(viewport);

  // Define o userAgent como de dispositivo móvel se for o caso
  if (viewport.isMobile) {
    await page.setUserAgent(viewport.userAgent);
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Esperar até que a página esteja completamente carregada
    await new Promise(resolve => setTimeout(resolve, 3000)); // Aguarda por 3 segundos para garantir que a página esteja carregada

    // Extrair e salvar o CSS crítico
    const criticalCSS = await page.evaluate(async () => {
      const styleTags = document.querySelectorAll('style, link[rel="stylesheet"]');
      let critical = '';

      // Função para buscar o CSS de um link externo
      async function fetchExternalCSS(href) {
        const response = await fetch(href);
        return response.text();
      }

      // Processa cada tag de estilo
      for (const tag of styleTags) {
        if (tag.tagName === 'STYLE') {
          critical += tag.innerHTML;
        } else if (tag.tagName === 'LINK') {
          // Fetch external CSS
          const href = tag.getAttribute('href');
          const cssText = await fetchExternalCSS(href);
          critical += cssText;
        }
      }
      return critical;
    });

    // Salvar o CSS crítico
    fs.writeFileSync(fileName, criticalCSS);
  } catch (error) {
    console.error(`Erro ao gerar CSS crítico para ${url}: ${error.message}`);
  } finally {
    // Fechar o navegador
    await browser.close();
  }
}

// Função para minificar um arquivo CSS
function minifyCSS(fileName) {
  return gulp.src(fileName)
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css/critical/minified/'));
}

// Tarefa do Gulp para gerar CSS crítico para todas as páginas
gulp.task('generate-critical-css', async function () {
  try {
    let content = [];

    // Fetch pages, posts, categories and tags
    for (const url of apiUrls) {
      const response = await axios.get(url);
      content = content.concat(response.data);
    }

    // Verifica se a home está presente e adiciona manualmente se não estiver
    const homePage = content.find(item => item.slug === 'home');
    if (!homePage) {
      const homeUrl = `${baseUrl}`;
      const desktopFileName = `./css/critical/home-desktop-critical.css`;
      const mobileFileName = `./css/critical/home-mobile-critical.css`;

      // Gerar CSS crítico para a home para desktop
      await generateCriticalCSS(homeUrl, desktopFileName, desktopViewport);

      // Gerar CSS crítico para a home para dispositivo móvel
      await generateCriticalCSS(homeUrl, mobileFileName, mobileViewport);

      // Adicionar a home manualmente
      content.push({
        id: 1,
        title: { rendered: 'Home', raw: 'Home' },
        slug: 'home',
        link: homeUrl
      });
    }

    // Gerar CSS crítico para cada página
    for (const item of content) {
      const pageUrl = item.link;
      const slug = path.basename(pageUrl); // Extrai o slug da URL
      const desktopFileName = `./css/critical/${slug}-desktop-critical.css`;
      const mobileFileName = `./css/critical/${slug}-mobile-critical.css`;

      // Gerar CSS crítico para desktop
      await generateCriticalCSS(pageUrl, desktopFileName, desktopViewport);

      // Gerar CSS crítico para dispositivo móvel
      await generateCriticalCSS(pageUrl, mobileFileName, mobileViewport);
    }

    // Minificar todos os arquivos CSS críticos gerados
    gulp.src('./css/critical/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('./css/critical/'));

  } catch (error) {
    console.error(`Erro ao gerar CSS crítico: ${error.message}`);
  }
});

// Tarefa padrão do Gulp
gulp.task('default', gulp.series('generate-critical-css'));
