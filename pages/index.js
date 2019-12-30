import UserList from "../components/user-list";
import Meta from "../components/meta";
import "../public/css/style.css";

function HomePage() {
  return (
    <>
      <Meta />
      <div className="container">
        <h2>🏆 List of survivors 🏆</h2>
        <UserList />
      </div>
    </>
  );
}

export default HomePage;
