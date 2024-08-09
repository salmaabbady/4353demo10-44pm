import { useState } from 'react';
import { useRouter } from 'next/router';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    preferences: '',
    availability: [],
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setMessage('Registration successful');
      router.push('/login');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input type="text" name="address1" placeholder="Address 1" onChange={handleChange} required />
      <input type="text" name="address2" placeholder="Address 2" onChange={handleChange} />
      <input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="state" placeholder="State" onChange={handleChange} required />
      <input type="text" name="zipCode" placeholder="ZIP Code" onChange={handleChange} required />
      <input type="text" name="skills" placeholder="Skills (comma separated)" onChange={handleChange} required />
      <input type="text" name="preferences" placeholder="Preferences" onChange={handleChange} />
      <input type="text" name="availability" placeholder="Availability (comma separated dates)" onChange={handleChange} />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
