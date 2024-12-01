import { db } from '../database.js'
import bcrypt from 'bcrypt'

export const getMe = async (req, res) => {
  try {
    const user_id = req.user_id
    const getUserQuery = `
      SELECT email, registration_date, user_id, username, is_admin
      FROM Users
      WHERE user_id = ?`
    const userData = await db.query(getUserQuery, [user_id])

    if (userData.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const response = {
      user: userData[0][0],
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error getting user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateMe = async (req, res) => {
  try {
    const user_id = req.user_id
    const { oldPassword, password } = req.body

    if (!oldPassword || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const getUserQuery = `SELECT password FROM Users WHERE user_id = ?`
    const userData = await db.query(getUserQuery, [user_id])
    if (userData[0].length !== 0) {
      const user = userData[0][0]
      const match = await bcrypt.compare(oldPassword, user.password)

      if (match) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const updateQuery = `
          UPDATE Users
          SET password = ?
          WHERE user_id = ?`
        const result = await db.query(updateQuery, [hashedPassword, user_id])

        if (result[0].affectedRows === 1) {
          res.status(201).json({ message: 'Password updated!' })
        } else {
          res.status(500).json({ error: 'Unable to update' })
        }
      } else {
        res.status(401).json({ error: 'Invalid old password' })
      }
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
