/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import UsersTable from './components/UsersTable'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [toggleColors, setToggleColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUSers = useRef<User[]>([])

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const resetUsers = () => {
    setUsers(originalUSers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results)
        originalUSers.current = res.results
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : users

  return (
    <div>
      <h1>Users List</h1>
      <header>
        <button
          onClick={() => {
            setToggleColors(!toggleColors)
          }}
        >
          Toggle Colors
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'Order Random' : 'Order by country'}
        </button>
        <button onClick={resetUsers}>Get initial state</button>
      </header>
      <main>
        <UsersTable
          users={sortedUsers}
          onDelete={handleDelete}
          showColors={toggleColors}
        />
      </main>
    </div>
  )
}

export default App
