/* eslint-disable react/react-in-jsx-scope */
import { useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import UsersTable from './components/UsersTable'
import { useUsers } from './hooks/useUsers'

function App() {
  const originalUSers = useRef<User[]>([])
  const [toggleColors, setToggleColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | undefined>(
    undefined
  )
  const { users, isLoading, fetchNextPage, hasNextPage } = useUsers()

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
        {users?.length > 0 && (
          <UsersTable
            users={sortedUsers}
            changeSorting={handleChangeSort}
            onDelete={handleDelete}
            showColors={toggleColors}
          />
        )}
        {isLoading && <div>Loading...</div>}
        {!isLoading && hasNextPage && (
          <button onClick={() => void fetchNextPage()}>Load more users</button>
        )}
      </main>
    </div>
  )
}

export default App
