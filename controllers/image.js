require('babel-register')({
  plugins: ['babel-plugin-transform-runtime'].map(require.resolve),
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react',
  ].map(require.resolve),
});

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { Readable } = require('stream');
const readPkg = require('read-pkg-up');
const { createElement: h } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const Datauri = require('datauri');
const resolveCWD = require('resolve-cwd');

const getDateTime = () => {
  const now = new Date();
  const Y = now.getFullYear();
  const M = now.getMonth();
  const d = now.getDate();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  return {
    date: [Y, M, d].join('-'),
    time: [h, m, s].join('.'),
  };
};

// Base CSS STYLING FOR PAGE
const baseCSS = `*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}`;

// CREATE HTML TEMPLATE
const getHtmlData = ({ body, baseCSS, css, styles, webfont }) => {
  const fontCSS = webfont ? getWebfontCSS(webfont) : '';
  const html = `<!DOCTYPE html>
    <head>
    <meta charset="utf-8"><style>${baseCSS}${fontCSS}${css}</style>
    ${styles}
    </head>
    ${body}`;
  const htmlBuffer = Buffer.from(html, 'utf8');
  const datauri = new Datauri();
  datauri.format('.html', htmlBuffer);
  const data = datauri.content;
  return data;
};

// GET FONT FACE
const getWebfontCSS = fontpath => {
  const { content } = new Datauri(fontpath);
  const [name, ext] = fontpath
    .split('/')
    .slice(-1)[0]
    .split('.');
  const css = `@font-face {
  font-family: '${name}';
  font-style: normal;
  font-weight: 400;
  src: url(${content});
}`;
  return css;
};

const render = async (Component, opts = {}) => {
  console.log(opts);
  const {
    props = {},
    css = '',
    filename,
    outDir,
    width,
    height,
    scale = 1,
    webfont,
    cssLibrary,
  } = opts;

  let body;
  let styles = '';
  const el = h(Component, props);
  body = renderToStaticMarkup(el);

  const data = getHtmlData({
    body,
    baseCSS,
    css,
    styles,
    webfont,
  });

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.goto('https://pacific-crag-45485.herokuapp.com/', {
    waitUntil: 'networkidle0',
  });

  const result = await page.screenshot({
    type: 'jpeg',
    quality: 100,
    clip: {
      x: 0,
      y: 70,
      width: parseInt(width),
      height: parseInt(height),
    },
    omitBackground: true,
  });
  await browser.close();

  return result;
};

exports.saveImage = async (req, res, next) => {
  const absolute = (file = '') =>
    !file || path.isAbsolute(file) ? file : path.join(process.cwd(), file);

  // Get current Date
  const date = getDateTime();
  // File of te component you want to take save image for
  const file = '../client/src/components/Test.js';

  const name = path.basename(file, path.extname(file));
  const filepath = absolute(name);
  const myFile = path.join(__dirname, file);

  const homedir = require('os').homedir();

  const opts = Object.assign({
    outDir: `${homedir}/Desktop`,
    filepath,
    width: 400,
    height: 400,
  });

  const Component = require(myFile).default || require(myFile);

  opts.css = absolute(opts.css);
  opts.outDir = absolute(opts.outDir);

  if (opts.css) {
    opts.css = fs.readFileSync(opts.css, 'utf8');
  }

  if (opts.props) {
    opts.props = JSON.parse(opts.props);
  }

  if (opts.puppeteer) {
    opts.puppeteer = JSON.parse(opts.puppeteer);
  }

  const run = async () => {
    try {
      const image = await render(Component, opts);
      const { date, time } = getDateTime();
      const outFile = `Image-${date}-${time}-${opts.width}x${opts.height}.jpeg`;
      const outPath = path.join(opts.outDir, outFile);
      const file = fs.createWriteStream(outPath);

      file.on('finish', () => {
        console.log('finished');
      });

      file.on('error', err => {
        console.log('error writing file');
        console.log(err);
      });

      file.write(image);
      file.end();

      res.send({ message: 'completed writing image' });
    } catch (err) {
      console.log(err);
      res.send({ message: 'failed writing image' });
    }
  };

  run();
};
