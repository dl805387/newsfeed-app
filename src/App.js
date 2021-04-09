import './App.css';
import React, { useState, useEffect } from "react";
import PostForm from './components/PostForm';
import TweetsView from './components/TweetsView';
const axios = require('axios').default;

function App() {

    const [tweetsData, setTweetsData] = useState([]);
    //
    const [show, setShow] = useState(false);
    //

    useEffect(() => {
        //retrieveTweets();
    }, []);

    // to do

    // if i make a post, the tweets does not re render
    // maybe a fix would be to add the <Tweet/> in a state

    // maybe add a mytweets button
    // this displays all the tweets

    return (
        <div className="App">
            <PostForm />
            <TweetsView />
        </div>
    );
}

export default App;
