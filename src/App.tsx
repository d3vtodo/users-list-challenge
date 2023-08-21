/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import UsersTable from './components/UsersTable'

function App() {
  const originalUSers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [toggleColors, setToggleColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | undefined>(
    undefined
  )

  const toggleCountrySort = () => {
    if (sorting === SortBy.COUNTRY) return setSorting(SortBy.NONE)
    setSorting(SortBy.COUNTRY)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.LAST]: (user) => user.name.last,
      [SortBy.NAME]: (user) => user.name.first
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProptery = compareProperties[sorting]
      return extractProptery(a).localeCompare(extractProptery(b))
    })
  }, [filteredUsers, sorting])

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
        <button onClick={toggleCountrySort}>
          {sorting === SortBy.COUNTRY ? 'Order Random' : 'Order by country'}
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
          changeSorting={handleChangeSort}
          onDelete={handleDelete}
          showColors={toggleColors}
        />
      </main>
    </div>
  )
}

export default App
