import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import './globals.css'

// TOFIX: change with your infos
export const metadata = {
  title: 'Nem 🥟',
  description: 'Kickstart your project with Next.js, Express and MySQL',
}
export const viewport = {
  width: 'device-width',
  initialScale: '1.0',
}

const fetchMe = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/me`, {
      method: 'GET',
      // credentials: 'include' does not work with fetch in Next.js Server Side
      headers: { Cookie: cookies().toString() },
    })
    const data = await response.json()
    if (response.status === 200 && data.user) {
      return data.user
    }
  } catch (error) {
    console.error('Error fetching user details:', error)
    return null
  }
}

export default async function RootLayout({ children }) {
  const user = await fetchMe()

  return (
    <html lang="fr">
      <body className="flex flex-col w-full h-screen bg-gradient-to-r from-white to-gray-100 text-black overflow-hidden">
        <header
          role="banner"
          className="flex h-10 bg-gray-200 items-center justify-center p-7"
        >
          <h1 className="sm:text-3xl text-2xl">
            <Link href="/">
              Nem 🥟 - Kickstart your project with Next.js, Express and MySQL
            </Link>
          </h1>
        </header>
        <div className="flex flex-1 h-screen w-screen">
          <div className="w-full flex sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
            <nav
              role="navigation"
              className="sm:w-52 w-full flex-shrink flex-grow-0 px-4 sticky top-0 bg-gray-200 h-10 sm:h-full"
            >
              <ul className="flex sm:flex-col  content-center justify-center">
                <li className="py-2 hover:bg-white rounded">
                  <Link href="/">
                    <HomeIcon />
                    <span className="hidden sm:inline px-2">Home</span>
                  </Link>
                </li>
                {user && (
                  <>
                    <li className="py-2 hover:bg-white rounded">
                      <Link href="/me">
                        <SettingsIcon />
                        <span className="hidden sm:inline px-2">
                          {user.username}
                        </span>
                      </Link>
                    </li>
                    {user.is_admin ? (
                      <>
                        <li className="py-2 bg-white rounded">
                          <span className="hidden sm:inline px-2">ADMIN</span>
                        </li>
                        <li className="py-2 hover:bg-white rounded">
                          <AdminPanelSettingsIcon />
                          <span className="hidden sm:inline px-2">admin</span>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </ul>
            </nav>
            <main role="main" className="w-full h-full p-3 pb-40 overflow-auto">
              {children}
            </main>
          </div>
        </div>
        <footer
          role="contentinfo"
          className="flex h-10 bg-gray-200 items-center justify-center sticky bottom-0 p-4"
        >
          {/* TOFIX: change with your infos */}
          <a
            href="https://github.com/Cycymomo"
            target="_blank"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Cycymomo
          </a>
          &nbsp;- 2024
        </footer>
      </body>
    </html>
  )
}
