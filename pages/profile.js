import { useEffect, useState } from 'react';
import Link from 'next/link';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.links}>
          <Link href="/events" style={styles.link}>View Events</Link>
          <Link href="/reports" style={styles.link}>Generate Report</Link>
        </div>
      </div>
      <h1 style={styles.heading}>User Profile</h1>
      {profile ? (
        <div style={styles.profileContainer}>
          <p>Email: {profile.user?.email ?? 'N/A'}</p>
          <p>Full Name: {profile.fullName}</p>
          <p>Address: {profile.address1}</p>
          <p>City: {profile.city}</p>
          <p>State: {profile.state}</p>
          <p>ZIP Code: {profile.zipCode}</p>
          <p>Skills: {Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills}</p>
          <p>Preferences: {profile.preferences}</p>
          <p>Availability: {Array.isArray(profile.availability) ? profile.availability.map(date => new Date(date).toLocaleDateString()).join(', ') : profile.availability}</p>
        </div>
      ) : (
        <p>No profile data found</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  links: {
    display: 'flex',
    gap: '10px',
  },
  link: {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  linkHover: {
    backgroundColor: '#e0e0e0',
  },
  heading: {
    textAlign: 'center',
    marginTop: '20px',
  },
  profileContainer: {
    textAlign: 'left',
    display: 'inline-block',
    marginTop: '20px',
  },
};

export default ProfilePage;
