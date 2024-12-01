'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const router = useRouter()
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
          credentials: 'include',
        }
      )
      const data = await response.json()

      if (response.status === 201) {
        setSuccess(data.message)
      } else {
        setError(data.error)
      }
    } catch (error) {
      console.error('Error signup user:', error)
      setError(error)
    }
  }

  return (
    <div className="p-8 w-96">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Create Account
      </h1>
      {success ? (
        <div className="text-green-500 rounded-lg shadow-lg pb-1">
          {success}
        </div>
      ) : null}
      {error ? <div className="text-red-500 pb-1">{error}</div> : null}
      <form className="space-y-4" onSubmit={handleSignup}>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="user name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
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
          ></input>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-purple-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default Signup
