import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function EditForm(props) {

    const [text, setText] = useState(props.originalText);

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
        props.setEditDiv(false);
        props.setText(text);
        return result;
    }

    return (
        <div className="overlay">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); editTweet();}}>Update</button>
                <button onClick={e => {e.preventDefault(); props.setEditDiv(false);}}>Cancel</button>
            </div>
        </div>
    );
}

export default EditForm;