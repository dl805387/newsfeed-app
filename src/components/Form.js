import React, { useState, useEffect } from "react";
const axios = require('axios').default;
// import css if you need to

// ideas
// have this form component on top of website
// make a tweet button that displays a white div overlay screen that also generates the form component

function Name() {

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
        return result;
    }

    const deleteTweet = async () => {
        const result = await axios({
            method: 'delete',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/39691',
            withCredentials: true,
        });
        return result;
    }

    useEffect(() => {
        //deleteTweet();
    }, []);

    return (
        <div className="App">
            <div>
                <textarea onChange={e => setText(e.target.value)} value={text}> </textarea>
                <button onClick={e => {e.preventDefault(); postTweet(); setText("")}}>Tweet</button>
            </div>
        </div>
    );
}

export default Name;
