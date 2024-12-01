import { db } from '../database.js'
import bcrypt from 'bcrypt'
import jsonWebToken from 'jsonwebtoken'

export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body

    if (!login || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const getUserQuery = `SELECT * FROM Users WHERE email = ? OR username = ?`
    const userData = await db.query(getUserQuery, [login, login])
    if (userData[0].length !== 0) {
      const user = userData[0][0]
      const match = await bcrypt.compare(password, user.password)

      if (match) {
        const token = jsonWebToken.sign(
          { user_id: user.user_id },
          process.env.APP_SECRET
        )
        res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          ...(process.env.NODE_ENV === 'production' && {
            domain: '.your-domain.fr', // TOFIX: replace with your domain
          }), // . prefix to make it available on all subdomains
        })
        res.status(200).json({ message: 'Login OK!' })
      } else {
        res.status(401).json({ error: 'Invalid login/password' })
      }
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const insertUserQuery = `INSERT INTO Users (username, email, password)
        VALUES (?, ?, ?)`

    const result = await db.query(insertUserQuery, [
      username,
      email,
      hashedPassword,
    ])

    if (result[0].affectedRows === 1) {
      res.status(201).json({ message: 'Account created! Please log in' })
    } else {
      res.status(500).json({ error: 'Unable to create account' })
    }
  } catch (error) {
    console.error('Error signup user:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out' })
}
