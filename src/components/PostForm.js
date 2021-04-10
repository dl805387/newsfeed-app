import React, { useState, useEffect } from "react";
const axios = require('axios').default;

// ideas
// have this form component on top of website
// make a tweet button that displays a white div overlay screen that also generates the form component
// !importent you need to also have a button that generates the form component

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
        props.setShowTweets(false);
        props.setShowTweets(true);
        return result;
    }

    return (
        <div className="overlay">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); postTweet(); setText("")}}>Tweet</button>
                <button onClick={e => {e.preventDefault(); props.setShowPost(false);}}>Cancel</button>
            </div>
        </div>
    );
}

export default PostForm;
