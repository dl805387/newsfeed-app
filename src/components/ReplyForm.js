import React, { useState, useEffect } from "react";
const axios = require('axios').default;
// import css if you need to

function ReplyForm(props) {

    const [text, setText] = useState("");

    // Post request to reply to a tweet
    const replyTweet = async () => {
        // Will not post if text field is empty
        if (text === "") {
            return;
        }
        const result = await axios({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
              "type": "reply",
              "parent": props.tweetID,
              "body": text
            },
        });
        return result;
    }

    // to do
    // make a x button

    return (
        <div className="App">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); replyTweet(); props.setReplyDiv([]);}}>Reply</button>
            </div>
        </div>
    );
}

export default ReplyForm;