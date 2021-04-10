import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function EditForm(props) {

    const [text, setText] = useState("");

    // Request to edit tweet
    const editTweet = async () => {
        // Will not work if text field is empty
        if (text === "") {
            return;
        }
        const result = await axios({
            method: 'put',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID,
            withCredentials: true,
            data: {
              body: text
            },
        });
        props.setEditDiv([]);
        props.setText(text);
        return result;
    }

    // to do
    // after you click edit, the tweet does not show the new edited tweet without refreshing page
    // make sure to change this

    return (
        <div>
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); editTweet();}}>Update</button>
                <button onClick={e => {e.preventDefault(); props.setEditDiv([]);}}>Cancel</button>
            </div>
        </div>
    );
}

export default EditForm;