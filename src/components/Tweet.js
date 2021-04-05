import React, { useState, useEffect } from "react";
import ReplyForm from "./ReplyForm";
import RetweetForm from "./RetweetForm";
const axios = require('axios').default;

function Tweet(props) {

    const [text, setText] = useState("");
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);
    const [author, setAuthor] = useState("");
    const [likeButton, setLikeButton] = useState("");

    const [replyDiv, setReplyDiv] = useState([]);
    const [retweetDiv, setRetweetDiv] = useState([]);

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
    // find a way to display replies when button is clicked

    // maybe specify if a tweet is a retweet

    return (
        <div className="tweet">
            <p>{author}</p>
            <p>{text}</p>
            <p>{"likes: " + likes}</p>
            <p>{"retweets: " + retweets}</p>
            <button onClick={e => {e.preventDefault(); likeTweet()}} >{likeButton}</button>
            <button onClick={e => {e.preventDefault(); setReplyDiv(<ReplyForm tweetID = {props.tweetID} setReplyDiv = {setReplyDiv} />) }} >Reply</button>
            <button onClick={e => {e.preventDefault(); setRetweetDiv(<RetweetForm tweetID = {props.tweetID} setRetweetDiv = {setRetweetDiv} />) }} >Retweet</button>
            <div className="overlay">{replyDiv}</div>
            <div className="overlay">{retweetDiv}</div>
        </div>
    );
}

export default Tweet;