import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ReportsPage = () => {
  const router = useRouter();

  const handleGenerateReport = (format, type) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }

    fetch(`/api/reports/generate?format=${format}&type=${type}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${type}_report.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error generating report:', error);
        alert('Failed to generate report.');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Reports</h1>
      <ul>
        <li>
          <button onClick={() => handleGenerateReport('csv', 'volunteers')} style={{ marginRight: '10px' }}>
            Generate Volunteers Report (CSV)
          </button>
        </li>
        <li>
          <button onClick={() => handleGenerateReport('csv', 'events')}>
            Generate Events Report (CSV)
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ReportsPage;
