import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios(
          'https://gfhwsqbvf1.execute-api.eu-west-1.amazonaws.com/dev/subscribe',
        );
        setData(result.data.message);
      } catch (err) {
        console.error('error:', err);cd
        throw(new Error(`Error: ${err}`));
      }
    }
    fetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data}
        </p>
      </header>
    </div>
  );
}

export default App;
