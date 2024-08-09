// testBcrypt.js
import bcrypt from 'bcrypt';

async function testBcrypt() {
  const password = 'yourpassword';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);

  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  console.log('Password Comparison Result:', isValidPassword);
}

testBcrypt();
