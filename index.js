const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const express = require("express");

const redis = require("redis");

// create express application instance
const app = express();

// create and connect redis client to local instance.
const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

const port = process.env.PORT || "3000";
const urlUsers =
  "https://raw.githubusercontent.com/condef5/freecodecamp-scraping/master/users.json";

async function getUsers() {
  try {
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

app.get("/data", async (req, res) => {
  req.setTimeout(10000);

  const userRedisKey = "user:data";
  console.time("getInfoUsers");

  return client.get(userRedisKey, async (err, users) => {
    if (users) {
      return res.json({ source: "cache", data: JSON.parse(users) });
    } else {
      const users = await getUsers();
      client.setex(userRedisKey, 3600, JSON.stringify(users));
      return res.json({ source: "api", data: users });
    }
  });
});

app.listen(3000, function() {
  console.log(`Server on running localhost:${port}`);
});
