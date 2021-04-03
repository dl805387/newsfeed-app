import './App.css';
import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function App() {

  const [status, setStatus] = useState(0);

  const retrieveTweets = async () => {
    const result = await axios({
      method: 'get',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true,
    });
    //console.log(result);
   // console.log(result.status);
    setStatus(result.status);
    return result;
  }
  retrieveTweets();

  return (
    <div className="App">
      <p>{status}</p>
    </div>
  );
}

export default App;
