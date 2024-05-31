const gulp = require('gulp');
const axios = require('axios');
const cleanCSS = require('gulp-clean-css');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const sass = require('gulp-sass')(require('node-sass'));

// URL base da API REST do WordPress
const baseUrl = 'https://lojadacriacao.com.br/';
const apiUrls = [
  `${baseUrl}/wp-json/wp/v2/pages`,
  `${baseUrl}/wp-json/wp/v2/posts`,
  `${baseUrl}/wp-json/wp/v2/categories`,
  `${baseUrl}/wp-json/wp/v2/tags`
];

// Pasta onde os arquivos CSS serão salvos
const outputDir = './css/critical/';

// Função para compilar Sass
function compileSass() {
  return gulp.src('./sass/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
}

// Função para verificar e criar o diretório de saída
function checkAndCreateOutputDir() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Diretório '${outputDir}' criado com sucesso.`);
  }
}

// Função para obter todas as páginas, posts e categorias
async function fetchContent() {
  try {
    const responses = await Promise.all(apiUrls.map(url => axios.get(url)));
    
    const content = responses.map(response => {
      return response.data.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        link: item.link || `${baseUrl}/${item.slug}/`  // fallback para posts e categorias
      }));
    }).flat();

    return content;
  } catch (error) {
    console.error('Erro ao obter o conteúdo:', error);
    return [];
  }
}

// Função para remover CSS não utilizado
async function removeUnusedCSS(url, filename) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Extraia o CSS não utilizado
  const unusedCSS = await page.evaluate(() => {
    const stylesheets = [...document.styleSheets];
    let cssText = '';
    for (const sheet of stylesheets) {
      try {
        const rules = [...sheet.cssRules];
        for (const rule of rules) {
          cssText += rule.cssText;
        }
      } catch (e) {
        // Ignorar erros ao acessar regras de CSS
      }
    }
    return cssText;
  });

  await browser.close();

  // Verifica e cria o diretório de saída se necessário
  checkAndCreateOutputDir();

  // Salvar o CSS em um arquivo
  fs.writeFileSync(path.join(outputDir, filename), unusedCSS);

  // Minificar o CSS
  gulp.src(path.join(outputDir, filename))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(outputDir));

  // Imprimir mensagem de sucesso
  console.log(`CSS gerado com sucesso para: ${filename}`);
}

// Task principal do Gulp
gulp.task('generate-unused-css', async function () {
  let content = await fetchContent();

  // Verifica se a home está presente e adiciona automaticamente se não estiver
  const homePage = content.find(item => item.slug === 'home');
  if (!homePage) {
    const homeUrl = `${baseUrl}/`;
    const homeFilename = 'home.css';
    await removeUnusedCSS(homeUrl, homeFilename);
    content.push({
      id: 1,
      title: { rendered: 'Home', raw: 'Home' },
      slug: 'home',
      link: homeUrl
    });
  }

  for (const item of content) {
    const url = item.link;
    const filename = `${item.slug}.css`;
    await removeUnusedCSS(url, filename);
  }
});

// Task para compilar Sass e depois gerar o CSS crítico
gulp.task('compile-sass', compileSass);
gulp.task('default', gulp.series('compile-sass', 'generate-unused-css'));