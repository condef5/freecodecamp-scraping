const fetch = require("node-fetch");

const urlUsers =
  "https://raw.githubusercontent.com/condef5/freecodecamp-scraping/master/users.json";
const urlProfileData =
  "https://api.freecodecamp.org/internal/api/users/get-public-profile?username=";

async function fetchAsync(url) {
  return fetch(url).then(res => res.json());
}

async function getInfoUsers() {
  const { users } = await fetchAsync(urlUsers);
  const promises = [];

  for (let i = 0; i < users.length; i++) {
    promises.push(
      fetchAsync(urlProfileData + users[i]).then(res => {
        const data = res.entities ? res.entities.user[users[i]] : {};
        return {
          name: data.name || "",
          about: data.about || "",
          picture: data.picture || "",
          username: users[i],
          points: data.points || 0
        };
      })
    );
  }

  return Promise.all(promises);
}

export default async (_req, res) => {
  const users = await getInfoUsers();
  res.status(200).json({ users });
};
