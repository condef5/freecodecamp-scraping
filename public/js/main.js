
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
    data.forEach(user => {
      html += `
        <div class="list__user">
          <div class="username">${user.name.toLowerCase()} (${user.username})</div>
          <div class="points">${user.points} points</div>
        </div>
        `
    });
    document.getElementById("data").innerHTML = html
  })
