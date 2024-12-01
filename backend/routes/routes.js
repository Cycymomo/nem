// route.js
import express from 'express'

import {
  loginUser,
  signupUser,
  logoutUser,
} from '../controllers/authController.js'
import { updateMe, getMe } from '../controllers/userController.js'

const router = express.Router()

// Auth
router.post('/login', async (req, res) => {
  if (req.user_id) {
    return res.status(400).json({ error: 'Already connected' })
  }
  return await loginUser(req, res)
})
router.post('/signup', async (req, res) => {
  if (req.user_id) {
    return res.status(400).json({ error: 'Already connected' })
  }
  return await signupUser(req, res)
})
router.post('/logout', async (req, res) => {
  if (!req.user_id) {
    return res.status(400).json({ error: 'Not connected' })
  }
  return await logoutUser(req, res)
})

// User
router.get('/me', async (req, res) => {
  if (!req.user_id) {
    return res.status(400).json({ error: 'Not connected' })
  }
  return await getMe(req, res)
})
router.post('/updateMe', async (req, res) => {
  if (!req.user_id) {
    return res.status(400).json({ error: 'Not connected' })
  }
  return await updateMe(req, res)
})

export default router
