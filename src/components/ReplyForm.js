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
        props.setReplyDiv(false); 
        props.setReplies(props.replies + 1);
        return result;
    }

    // to do
    // !important
    // if text field is empty, then change color of the button, and maybe make it unclickable
    // do this for the edit form as well

    return (
        <div className="overlay">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); replyTweet();}}>Reply</button>
                <button onClick={e => {e.preventDefault(); props.setReplyDiv(false);}}>Cancel</button>
            </div>
        </div>
    );
}

export default ReplyForm;