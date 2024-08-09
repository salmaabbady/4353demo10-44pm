// pages/api/auth/register.js
import { register } from '../../../backend/authService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, ...profile } = req.body;

  try {
    const { user, token } = await register({ email, password, profile });
    return res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
