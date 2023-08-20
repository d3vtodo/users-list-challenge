import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {JSON.stringify(users)}
    </div>
  );
}

export default App;
