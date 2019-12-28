const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const express = require("express");
const cache = require("memory-cache");

// create express application instance
const app = express();
const port = process.env.PORT || "3000";
const urlUsers =
  "https://raw.githubusercontent.com/condef5/freecodecamp-scraping/master/users.json";
const memCache = new cache.Cache();

const cacheMiddleware = duration => {
  return (req, res, next) => {
    const key = "__express__" + req.originalUrl || req.url;
    const cacheContent = JSON.parse(memCache.get(key));
    if (cacheContent) {
      res.json({ ...cacheContent, source: "cache" });
      return;
    } else {
      res.sendResponse = res.json;
      res.json = body => {
        memCache.put(key, JSON.stringify(body), duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

async function getUsers() {
  try {
    console.time("getInfoUsers");
    const response = await fetch(urlUsers);
    const { users } = await response.json();
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const promises = [];

    for (let i = 0; i < users.length; i++) {
      promises.push(
        browser.newPage().then(async page => {
          await page.goto(`https://www.freecodecamp.org/${users[i]}`);
          await page.waitForSelector(".username", {
            visible: true,
            timeout: 4500
          });
          return await page.evaluate(() => {
            const username = document.querySelector(".username");
            const name = document.querySelector(".name");
            const points = document.querySelector(".points");
            const picture = document.querySelector(".avatar").src;
            return {
              username: username ? username.innerText.replace("@", "") : "",
              points: points
                ? parseInt(points.innerText.replace(" points", ""))
                : "",
              name: name ? name.innerText : "",
              picture
            };
          });
        })
      );
    }

    const result = await Promise.all(promises);
    await browser.close();
    console.timeEnd("getInfoUsers");
    return result;
  } catch (e) {
    console.log(e);
  }
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/data", cacheMiddleware(3600), async (req, res) => {
  req.setTimeout(10000);
  const users = await getUsers();
  console.log('llego jhasta ')
  return res.json({ source: "api", data: users });
});

app.listen(3000, function() {
  console.log(`Server on running localhost:${port}`);
});
