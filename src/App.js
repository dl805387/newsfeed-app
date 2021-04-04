import './App.css';
import React, { useState, useEffect } from "react";
import Tweet from './components/Tweet';
const axios = require('axios').default;

function App() {

  const [tweetsData, setTweetsData] = useState([]);

  const retrieveTweets = async () => {
    const result = await axios({
      method: 'get',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true,
    });
    //console.log(result);
    //console.log(result.data);
    setTweetsData(result.data);
    return result;
  }

  useEffect(() => {
    retrieveTweets();
  }, []);

  return (
    <div className="App">
      {tweetsData.map(x => {
        return <Tweet tweetID = {x.id} key = {x.id}/>
      })}
    </div>
  );
}

export default App;
