'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Me = () => {
  const router = useRouter()
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleMe = async (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')

    if (password !== password2) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/updateMe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ oldPassword, password }),
          credentials: 'include',
        }
      )
      const data = await response.json()

      if (response.status === 201) {
        setSuccess(data.message)
        router.refresh()
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
        Change Password
      </h1>
      {success ? (
        <div className="text-green-500 rounded-lg shadow-lg pb-1">
          {success}
        </div>
      ) : null}
      {error ? <div className="text-red-500 pb-1">{error}</div> : null}
      <form className="space-y-4" onSubmit={handleMe}>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Old Password:
          </label>
          <input
            type="password"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            New Password:
          </label>
          <input
            type="password"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Retype to confirm:
          </label>
          <input
            type="password"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="new password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
        >
          Change Password
        </button>
      </form>
    </div>
  )
}

export default Me
