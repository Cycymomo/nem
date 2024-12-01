import React from 'react'
import { cookies } from 'next/headers'

import Homepage from '@/components/Homepage/Homepage'

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

export default async function Home() {
  const user = await fetchMe()

  return <Homepage user={user} />
}
