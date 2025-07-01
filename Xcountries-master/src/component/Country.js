import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
      setCountries(response.data);
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error fetching data: ' + (err?.message || err));
      setError('Failed to load countries. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="countries-list">
      {countries.map((country) => (
        <div key={country.name} className="country-card">
          <img src={country.flag} alt={`${country.name} flag`} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export { Country };
