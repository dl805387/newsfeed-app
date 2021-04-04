import React, { useState, useEffect } from "react";
const axios = require('axios').default;
// import css

function Tweet(props) {

    const [text, setText] = useState("");

    const retrieveTweet = async () => {
        const result = await axios({
            method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID,
            withCredentials: true,
        });
        setText(result.data.body);
        return result;
    }

    useEffect(() => {
        retrieveTweet();
    });

    return (
        <div className="App">
            <p>{text}</p>
        </div>
    );
}

export default Tweet;