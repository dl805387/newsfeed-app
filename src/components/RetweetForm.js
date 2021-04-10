import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function RetweetForm(props) {

    const [text, setText] = useState("");

    // Add retweet to the database
    const retweet = async () => {
        const result = await axios({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                "type": "retweet",
                "parent": props.tweetID,
                "body": text
            },
        });
        props.setRetweetDiv(false);
        // re-renders tweets 
        props.setShowTweets(false);
        props.setShowTweets(true);
        return result;
    }

    // to do
    // when user retweets, add it to state without refreshing

    return (
        <div className="overlay">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); retweet(); }}>Retweet</button>
                <button onClick={e => {e.preventDefault(); props.setRetweetDiv(false);}}>Cancel</button>
            </div>
        </div>
    );
}

export default RetweetForm;