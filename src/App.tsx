/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import UsersTable from './components/UsersTable'

function App() {
  const originalUSers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [toggleColors, setToggleColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | undefined>(
    undefined
  )

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

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLocaleLowerCase()
            .includes(filterCountry.toLocaleLowerCase())
        )
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers
  }, [filteredUsers, sortByCountry])

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
        <input
          type="text"
          onChange={(e) => setFilterCountry(e.target.value)}
          value={filterCountry}
          placeholder="Filter by country"
        />
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
