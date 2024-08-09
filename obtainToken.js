import fetch from 'node-fetch';

async function login() {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'testingtestergroup15@tutamail.com',
      password: 'password',
    }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Token:', data.token);
  } else {
    console.error('Login failed:', data.error);
  }
}

login();
