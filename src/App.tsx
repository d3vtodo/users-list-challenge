import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./types";
import UsersTable from "./components/UsersTable";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [toggleColors, setToggleColors] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => setUsers(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <header>
        <button onClick={() => setToggleColors(!toggleColors)}>
          Toggle Colors
        </button>
      </header>
      <main>
        <UsersTable users={users} showColors={toggleColors} />
      </main>
    </div>
  );
}

export default App;
