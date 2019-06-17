const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

exports.screenshotMap = async (req, res, next) => {
  try {
    const { lineFeatures } = req.body;
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    // Test coordinates to be replaced with the coordinates for the route being saved
    // const coords = [
    //   [-117.72059997787743, 34.103463520496675],
    //   [-117.72768100967674, 34.107410067717396],
    //   [-117.72944053878828, 34.112944590071365],
    //   [-117.73699363937939, 34.1173411747159],
    // ];

    const coords = lineFeatures.map(line => line.geometry.coordinates);

    const flattenedCoords = coords.reduce((accum, arr) => {
      return accum.concat(arr);
    }, []);

    // console.log(flattenedCoords);

    const coordsStr = JSON.stringify(flattenedCoords);

    const URL =
      process.env.NODE_ENV === 'production'
        ? 'https://pacific-crag-45485.herokuapp.com/test'
        : 'http://localhost:3000/test';

    await page.goto(
      `https://pacific-crag-45485.herokuapp.com/test?coords=${coordsStr}`,
      {
        waitUntil: 'networkidle0',
      }
    );

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
        width: 400,
        height: 400,
      },
      omitBackground: true,
    });

    await browser.close();

    const base64Image = await image.toString('base64');

    req.image = base64Image;
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
