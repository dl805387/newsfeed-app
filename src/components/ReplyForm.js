import React, { useState } from "react";
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

        // turn off dark cover
        props.setDarkCover(false);

        return result;
    }

    return (
        <div className="overlay">
            <div className="popup">
                <textarea className="textarea has-fixed-size" onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button className="button is-success is-outlined" onClick={e => {e.preventDefault(); replyTweet();}}>Reply</button>
                <button className="button is-danger is-outlined" onClick={e => {e.preventDefault(); props.setReplyDiv(false); props.setDarkCover(false); }}>Cancel</button>
            </div>
        </div>
    );
}

export default ReplyForm;