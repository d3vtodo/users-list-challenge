import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./types";
import UsersTable from "./components/UsersTable";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => setUsers(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <UsersTable users={users} />
    </div>
  );
}

export default App;
