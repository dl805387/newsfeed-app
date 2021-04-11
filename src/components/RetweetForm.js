import React, { useState } from "react";
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
        // re-rendering will be based on if you are viewing tweets or my tweets
        if (props.setShowMyTweets === undefined) {
            props.setShowTweets(false);
            props.setShowTweets(true);
        } else {
            props.setShowMyTweets(false);
            props.setShowMyTweets(true);
        }

        // turn off dark cover
        props.setDarkCover(false);

        return result;
    }

    return (
        <div className="overlay">
            <div className="popup">
                <textarea className="textarea has-fixed-size" onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button className="button is-info is-outlined" onClick={e => {e.preventDefault(); retweet(); }}>Retweet</button>
                <button className="button is-danger is-outlined" onClick={e => {e.preventDefault(); props.setRetweetDiv(false); props.setDarkCover(false); }}>Cancel</button>
            </div>
        </div>
    );
}

export default RetweetForm;