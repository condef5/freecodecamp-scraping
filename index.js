const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || '3000';
const urlUsers = 'https://raw.githubusercontent.com/condef5/freecodecamp-scraping/master/users.json';
const urlProfileData = 'https://www.freecodecamp.org/api/users/get-public-profile?username=';

async function fetchAsync(url) {
  return await fetch(url).then(res => res.json());
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

/**
 * Register /data route */
app.get('/data', async (req, res, next) => {
  fetchAsync(urlUsers)
    .then(async data => {
      const users = data.users;
      try {
        /**
         * Enqueue all profiles to be scraped */
        const promises = []
        for (let i = 0; i < users.length; i++) {
          promises.push(fetchAsync(urlProfileData + users[i]).then((res) => {
            const data = res.entities ? res.entities.user[users[i]] : {};
            return {
              name:     data.name || '',
              about:    data.about || '',
              picture:  data.picture || '',
              username: users[i],
              points:   data.points || 0
            }
          }))
        }

        /**
         * Wait for page promises to finish */
        res.json(await Promise.all(promises));
      } catch (e) {
        next(e)
      }
  });
})

/**
 * Start the application server */
app.listen(3000, function () {
  console.log(`Server on running localhost : ${port}`);
});

