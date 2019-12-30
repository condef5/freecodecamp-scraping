import UserList from "../components/user-list";
import "../public/css/style.css";

function HomePage() {
  return (
    <div className="container">
      <h2>🏆 List of survivors 🏆</h2>
      <UserList />
    </div>
  );
}

export default HomePage;
