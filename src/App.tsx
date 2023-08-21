import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./types";
import UsersTable from "./components/UsersTable";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [toggleColors, setToggleColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => setUsers(res.results))
      .catch((err) => console.error(err));
  }, []);

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  return (
    <div>
      <h1>Users List</h1>
      <header>
        <button onClick={() => setToggleColors(!toggleColors)}>
          Toggle Colors
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "Order Random" : "Order by country"}
        </button>
      </header>
      <main>
        <UsersTable users={sortedUsers} showColors={toggleColors} />
      </main>
    </div>
  );
}

export default App;
