const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || '3000';
const { users } = JSON.parse(fs.readFileSync('users.json'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.get('/data', async (req, res, next) => {
  let response = [];
  try {
    puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
      const promises = []
      for (let i = 0; i < users.length; i++) {
        promises.push(browser.newPage().then(async page => {
          await page.goto(`https://www.freecodecamp.org/${users[i]}`);
          await page.waitFor(1200);
          const result = await page.evaluate(() => {
            let username = document.querySelector('.username');
            let name = document.querySelector('.name');
            let points = document.querySelector('.points');
            return {
              "username": username ? username.innerText.replace("@", "") : "",
              "points": points ? parseInt(points.innerText.replace(" points", "")) : "",
              "name": name ? name.innerText : ""
            }
          });
          return result;
        }))
      }
      await Promise.all(promises).then(values => {
        response = values;
      });
      await browser.close()
      res.json(response);
    })
  } catch (e) {
    next(e)
  }
})

app.listen(3000, function () {
  console.log(`Server on running localhost : ${port}`);
});


