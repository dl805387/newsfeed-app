import React, { useState, useEffect } from "react";
const axios = require('axios').default;
// import css

function Tweet(props) {

    const [text, setText] = useState("");
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);
    const [author, setAuthor] = useState("");

    const retrieveTweet = async () => {
        const result = await axios({
            method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID,
            withCredentials: true,
        });
        setText(result.data.body);
        setLikes(result.data.likeCount);
        setRetweets(result.data.retweetCount);
        setAuthor(result.data.author);
        return result;
    }

    useEffect(() => {
        retrieveTweet();
    });


    // to do
    // implement a like button

    return (
        <div className="App">
            <p>{author}</p>
            <p>{text}</p>
            <p>{"likes: " + likes}</p>
            <p>{"retweets: " + retweets}</p>
        </div>
    );
}

export default Tweet;