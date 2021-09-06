import { useEffect, useState } from 'react'
import WsSignal from '../components/WsSignal'

interface User {
  id: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export const Home = (): JSX.Element => {
  const [users, setUsers] = useState([] as Array<User>)

  const getUser = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  const createUser = async () => {
    await fetch('/api/users/create')
    getUser()
  }

  const deleteUsersAll = async () => {
    await fetch('/api/users/delete')
    getUser()
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <button onClick={() => createUser()}>ユーザー作成</button>
      <button onClick={() => deleteUsersAll()}>ユーザー削除</button>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <ul>
                <li>ID: {user.id}</li>
                <li>Name: {user.name}</li>
                <li>Password: {user.password}</li>
                <li>Created At: {user.createdAt}</li>
                <li>Updated At: {user.updatedAt}</li>
              </ul>
            </li>
          ))}
      </ul>
      <WsSignal />
    </>
  )
}

export default Home
