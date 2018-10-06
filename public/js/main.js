
fetch("/data")
.then(response => response.json())
.then(data => {
  data = data.sort((a, b) => b.points - a.points);
  let header =
  `
  <div class="list__header">
    <div>User</div>
    <div>Points</div>
  </div>
  `
  let leaderboard = 
  `
  <div class="list__leaderboard">
  `
  let users = ``
  data.forEach((user, index) => {
    index <= 2 ?
    leaderboard += `
      <div class="list__leader">
        <img class="avatar" src="${user.picture}"/>
        <span class="pos${index + 1}"></span>
        <div class="leader_about">
          <p>${user.name.toLowerCase()}</p>
          <a href="https://www.freecodecamp.org/${user.username}" target="_blank">@${user.username}</a>
          <div class="points">${user.points}</div>
        </div>
      </div>
    `
   :
   users += `
      <div class="list__user">
        <div class="username">
          <span>${index + 1}. </span>
          <img class="avatar" src="${user.picture}"/>
          <span>${user.name.toLowerCase()}</span>
          <a href="https://www.freecodecamp.org/${user.username}" target="_blank">@${user.username}</a>
        </div>
        <div class="points">${user.points}</div>
      </div>
      `
  });
  leaderboard += `</div>`
  document.getElementById("data").innerHTML = leaderboard + header + users;
})
