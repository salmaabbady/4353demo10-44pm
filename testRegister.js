// testRegister.js
import authService from './backend/authService.js';

async function testRegister() {
  try {
    const user = { email: 'test@example.com', password: 'password' };
    const result = await authService.register(user);
    console.log('User registered:', result);
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

testRegister();
