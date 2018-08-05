
fetch("/data")
  .then(response => response.json())
  .then(data => {
    data = data.sort((a, b) => b.points - a.points);
    let html = `
      <div class="list__header">
        <div>User</div>
        <div>Points</div>
      </div>
    `
    data.forEach((user, index) => {
      html += `
        <div class="list__user">
          <div class="username">
            <span>${index + 1}. ${user.name.toLowerCase()}</span>
            <a href="https://www.freecodecamp.org/${user.username}" target="_blank">@${user.username}</a>
          </div>
          <div class="points">${user.points}</div>
        </div>
        `
    });
    document.getElementById("data").innerHTML = html
  })
