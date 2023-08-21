import { type User } from '../types'

interface UsersTableProps {
  users: User[]
  showColors: boolean
  onDelete: (email: string) => void
}

export default function UsersTable({
  users,
  showColors,
  onDelete
}: UsersTableProps) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>CTA</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const bgColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? bgColor : 'transparent'

          return (
            <tr key={index} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt="user image" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    onDelete(user.email)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
