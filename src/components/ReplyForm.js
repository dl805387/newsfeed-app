import React, { useState, useEffect } from "react";
const axios = require('axios').default;

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
        props.setReplyDiv([]);
        return result;
    }

    // to do
    // change cancel button to x

    return (
        <div>
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); replyTweet();}}>Reply</button>
                <button onClick={e => {e.preventDefault(); props.setReplyDiv([]);}}>Cancel</button>
            </div>
        </div>
    );
}

export default ReplyForm;