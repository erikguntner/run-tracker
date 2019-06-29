const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

exports.screenshotMap = async (req, res, next) => {
  try {
    const { lineFeatures } = req.body;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // open new browser
    const page = await browser.newPage();

    // create array of coordinates from geojson features
    const coords = lineFeatures.map(line => line.geometry.coordinates);
    // reduce to 2D array of [lat, lon] coords
    const flattenedCoords = coords.reduce((accum, arr) => {
      return accum.concat(arr);
    }, []);
    // Stringify coords before using them as query string
    const coordsStr = JSON.stringify(flattenedCoords);

    const URL =
      process.env.NODE_ENV === 'production'
        ? 'https://pacific-crag-45485.herokuapp.com/test'
        : 'http://localhost:3000/test';

    // goto page with map sending coordintaes along
    await page.goto(`${URL}?coords=${coordsStr}`, {
      waitUntil: 'networkidle0',
    });

    // wait for map to load, call onLoad callback, and set state to make the h1 visible
    // await page.waitForSelector('h1');
    // wait one more second to make sure all tiles for the map are loaded. Longer routes can require significantly more tiles
    await page.waitFor(1000);

    const image = await page.screenshot({
      type: 'jpeg',
      quality: 100,
      clip: {
        x: 0,
        y: 70,
        width: 640,
        height: 360,
      },
      omitBackground: true,
    });

    await browser.close();
    // convert buffer to base64 string
    // const base64Image = await image.toString('base64');
    // attach to request object to be used in the next middleware
    req.image = image;
    next();

    // writeFileToDesktop(image, res);
    // res.send({ data: base64Image });
  } catch (err) {
    res.status(400).send(err);
  }
};

const writeFileToDesktop = (image, res) => {
  try {
    const homedir = require('os').homedir();

    const outFile = `Map-Image.jpeg`;
    const outPath = path.join(`${homedir}/Desktop`, outFile);
    const file = fs.createWriteStream(outPath);

    file.on('finish', () => {
      console.log('finished');
      res.send({ message: 'completed writing image' });
    });

    file.on('error', err => {
      console.log('error writing file');
      console.log(err);
    });

    file.write(image);
    file.end();
  } catch (err) {
    console.log(err);
    res.send({ message: 'failed writing image' });
  }
};
