'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'

const handleLogout = async (e, router) => {
  e.preventDefault()

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/logout`,
      {
        method: 'POST',
        credentials: 'include',
      }
    )
    if (response.status === 200) {
      router.refresh()
    }
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export default function Homepage({ user }) {
  const router = useRouter()

  return user ? (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Welcome {user.username}
      </h1>
      <Link href="#" onClick={(e) => handleLogout(e, router)}>
        <LogoutIcon />
        <span className="inline px-2">Déconnexion</span>
      </Link>
    </div>
  ) : (
    <div className="text-center p-10">
      <Link
        href="/auth/login"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Login
      </Link>
      &nbsp;&nbsp; &nbsp;&nbsp;
      <Link
        href="/auth/signup"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Signup
      </Link>
    </div>
  )
}
