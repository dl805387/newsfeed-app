import React, { useState, useEffect } from "react";
import ReplyForm from "./ReplyForm";
const axios = require('axios').default;
// import css

function Tweet(props) {

    const [text, setText] = useState("");
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);
    const [author, setAuthor] = useState("");
    const [likeButton, setLikeButton] = useState("");

    const [replyDiv, setReplyDiv] = useState([]);

    // Get tweet using id and sets the states
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
        if (result.data.isLiked === false) {
            setLikeButton("Like");
        } else {
            setLikeButton("Unlike");
        }
        return result;
    }

    // Likes the tweet, but unlike tweet if tweet is already liked
    const likeTweet = async () => {
        if (likeButton === "Like") {
            await axios({
                method: 'put',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID + '/like',
                withCredentials: true,
            });
            setLikeButton("Unlike");
        } else {
            await axios({
                method: 'put',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID + '/unlike',
                withCredentials: true,
            });
            setLikeButton("Like");
        }
    }

    useEffect(() => {
        retrieveTweet();
    });


    // to do
    // reply
    // find out how many replies are allowed on a single tweet
    // can you reply to your own tweet

    // how to implement
    // have a reply button
    // this button need to generate a form that overlays the screen

    // to do overlay, use z-index on the div

    return (
        <div>
            <p>{author}</p>
            <p>{text}</p>
            <p>{"likes: " + likes}</p>
            <p>{"retweets: " + retweets}</p>
            <button onClick={e => {e.preventDefault(); likeTweet()}} >{likeButton}</button>
            <button onClick={e => {e.preventDefault(); setReplyDiv(<ReplyForm tweetID = {props.tweetID} setReplyDiv = {setReplyDiv} />) }} >Reply</button>
            <div>{replyDiv}</div>
        </div>
    );
}

export default Tweet;