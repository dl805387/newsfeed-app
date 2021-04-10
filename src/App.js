import './App.css';
import React, { useState, useEffect } from "react";
import PostForm from './components/PostForm';
import TweetsView from './components/TweetsView';
import MyTweetsView from './components/MyTweetsView';
const axios = require('axios').default;

function App() {

    const [text, setText] = useState("");   // represents the text body

    // These states below are used for conditional rendering
    const [showPost, setShowPost] = useState(false);
    const [showTweets, setShowTweets] = useState(false);
    const [showMyTweets, setShowMyTweets] = useState(false);

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
        // re-rendering will be based on if you are viewing tweets or my tweets
        if (showTweets) {
            setShowTweets(false);
            setShowTweets(true);
        } else {
            setShowMyTweets(false);
            setShowMyTweets(true);
        }
        return result;
    }

    useEffect(() => {
        setShowTweets(true);
    }, []);

    // to do
    // do thorough testing before submitting
    // such as testing on replies view
    // testing to see if view changes

    return (
        <div className="App">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); postTweet(); setText("")}}>Tweet</button>
            </div>

            <button onClick={e => {e.preventDefault(); setShowPost(true); }}>Tweet</button>
            <button onClick={e => {e.preventDefault(); setShowMyTweets(false); setShowTweets(true); }}>All tweets</button>
            <button onClick={e => {e.preventDefault(); setShowTweets(false); setShowMyTweets(true) }}>show my tweets</button>

            { showPost && (<PostForm setShowPost = {setShowPost} setShowTweets = {setShowTweets} setShowMyTweets = {setShowMyTweets} showTweets = {showTweets} />) }
            { showTweets && (<TweetsView setShowTweets = {setShowTweets} />) }
            { showMyTweets && (<MyTweetsView setShowMyTweets = {setShowMyTweets} />) }
            
        </div>
    );
}

export default App;
