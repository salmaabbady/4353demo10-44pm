// pages/api/auth/login.js
import { login } from '../../../backend/authService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const { user, token } = await login(email, password);
      res.status(200).json({ token });

    } catch (error) {
      console.error('Error logging in:', error);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
