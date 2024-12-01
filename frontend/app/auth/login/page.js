'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password }),
          credentials: 'include',
        }
      )
      const data = await response.json()

      if (response.status === 200) {
        router.push('/')
        router.refresh()
      } else {
        setError(data.error)
      }
    } catch (error) {
      console.error('Error during login User:', error)
      setError(error)
    }
  }

  return (
    <div className="p-8 w-96">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Login</h1>
      {error ? (
        <div className="text-red-500 rounded-lg shadow-lg pb-1">{error}</div>
      ) : null}
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Login:
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="username or email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        No account?{' '}
        <Link href="/auth/signup" className="text-purple-500 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}

export default Login
