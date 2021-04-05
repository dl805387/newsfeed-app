import './App.css';
import React, { useState, useEffect } from "react";
import Tweet from './components/Tweet';
import PostForm from './components/PostForm';
const axios = require('axios').default;

function App() {

    const [tweetsData, setTweetsData] = useState([]);

    // Makes a get request to the tweets database
    const retrieveTweets = async () => {
        const result = await axios({
            method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
        });
        setTweetsData(result.data);
        return result;
    }

    useEffect(() => {
        retrieveTweets();
    }, []);

    // to do
    // do this after myTweet is done
    // if it is your tweet, then generate myTweet component, not Tweet

    return (
        <div className="App">
            <PostForm />
            <div>
                {tweetsData.slice([0], [50]).map(x => {
                    return <Tweet tweetID = {x.id} key = {x.id}/>
                })}
            </div>

            <div className="container">
                <div className="box" style={{background : "red"}}></div>
                <div className="box stack-top" style={{background : "blue"}}></div>
            </div>
        </div>
    );
}

export default App;
