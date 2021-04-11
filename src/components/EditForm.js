import React, { useState } from "react";
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
        
        // turn off dark cover
        props.setDarkCover(false);

        return result;
    }

    return (
        <div className="overlay">
            <div className="popup">
                <textarea className="textarea has-fixed-size" onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button className="button is-success is-outlined" onClick={e => {e.preventDefault(); editTweet();}}>Update</button>
                <button className="button is-danger is-outlined" onClick={e => {e.preventDefault(); props.setEditDiv(false); props.setDarkCover(false); }}>Cancel</button>
            </div>
        </div>
    );
}

export default EditForm;