import React, { useState } from "react";
const axios = require('axios').default;

function PostForm(props) {

    const [text, setText] = useState("");   // represents the text body

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
        props.setShowPost(false);
        
        // re-renders tweets
        // re-rendering will be based on if you are viewing tweets or my tweets
        if (props.showTweets) {
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
                <textarea className="textarea has-fixed-size" onChange={e => setText(e.target.value)} value={text} placeholder="What's happening?"> </textarea>
                <button className="button is-info is-outlined" onClick={e => {e.preventDefault(); postTweet(); setText("")}}>Tweet</button>
                <button className="button is-danger is-outlined" onClick={e => {e.preventDefault(); props.setShowPost(false); props.setDarkCover(false); }}>Cancel</button>
            </div>
        </div>
    );
}

export default PostForm;
