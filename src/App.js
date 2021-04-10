import './App.css';
import React, { useState, useEffect } from "react";
import PostForm from './components/PostForm';
import TweetsView from './components/TweetsView';
const axios = require('axios').default;

function App() {

    const [text, setText] = useState("");   // represents the text body

    const [showTweets, setShowTweets] = useState(false);
    const [showPost, setShowPost] = useState(false);

    // Adds tweet to the database
    const postTweet = async () => {
        // Will not post if text field is empty
        if (text === "") {
            return;
        }
        const result = await axios({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                body: text
            },
        });
        // re-renders tweets 
        setShowTweets(false);
        setShowTweets(true);
        return result;
    }

    useEffect(() => {
        setShowTweets(true);
    }, []);

    // to do

    // if i make a post, the tweets does not re render

    // maybe add a mytweets button
    // this displays all the tweets

    return (
        <div className="App">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); postTweet(); setText("")}}>Tweet</button>
            </div>

            <button onClick={e => {e.preventDefault(); setShowPost(true); }}>Tweet</button>
            <button onClick={e => {e.preventDefault(); setShowTweets(false); }}>do not show</button>

            { showPost && (<PostForm setShowPost = {setShowPost} setShowTweets = {setShowTweets} />) }
            { showTweets && (<TweetsView setShowTweets = {setShowTweets} />) }
            
        </div>
    );
}

export default App;
