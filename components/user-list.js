import React from "react";
import useSWR from "swr";
import fetch from "node-fetch";

const fetcher = url => fetch(url).then(response => response.json());

const defaultImage = "https://i.imgur.com/ya5TEXq.png";

function UserList() {
  const { data, error } = useSWR("/api/users", fetcher);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;

  const users = data.users.sort((a, b) => b.points - a.points);

  return (
    <div>
      <div className="list__leaderboard">
        {users.slice(0, 3).map((user, index) => (
          <div className="list__leader" key={user.username}>
            <img className="avatar" src={user.picture} />
            <span className={`pos${index + 1}`}></span>
            <div className="leader_about">
              <p>{user.name.toLowerCase()} </p>
              <a
                href={`https://www.freecodecamp.org/${user.username}`}
                target="_blank"
              >
                @{user.username}
              </a>
              <div className="points">{user.points}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="list__header">
        <div>User</div>
        <div>Points</div>
      </div>
      <div className="list__users">
        {users.slice(3).map((user, index) => {
          return (
            <div className="list__user" key={user.username}>
              <div className="username">
                <span className="username__index">{index + 4}. </span>
                <img
                  className="avatar"
                  src={user.picture}
                  onError={event =>
                    event.target.setAttribute("src", defaultImage)
                  }
                />
                <span className="mr-2">{user.name.toLowerCase()}</span>
                <a
                  href={`https://www.freecodecamp.org/${user.username}`}
                  target="_blank"
                >
                  @{user.username}
                </a>
              </div>
              <div className="points">{user.points}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;
