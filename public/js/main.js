
fetch("/data")
  .then(response => response.json())
  .then(data => {
    data = data.sort((a, b) => b.points - a.points);
    let html = ''
    
    data.forEach((user, index) => {
      html += `
        <div class="list__user">
          <h3 class="username">${user.name.toLowerCase()}</h3>
          <h3 class="points">${user.points}</h3>
          <a href="https://www.freecodecamp.org/${user.username}" target="_blank">@${user.username}</a>
        </div>
        `
    });
    document.getElementById("data").innerHTML = html
  })
