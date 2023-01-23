import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setData(json);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  };

  const { data, loading, error } = useFetch('http://localhost:3000/');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
    <h1>My API Data</h1>
    {data.map((item) => (
      <div key={item.id}>
        <p>{item.title}</p>
      </div>
    ))}
  </div>
  );
}

export default App;
