import React, { useState, useEffect } from "react";
import RepliesView from "./RepliesView";
import ReplyForm from "./ReplyForm";
import RetweetForm from "./RetweetForm";
const axios = require('axios').default;

function Tweet(props) {

    const [text, setText] = useState("");
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);
    const [author, setAuthor] = useState("");
    const [likeButton, setLikeButton] = useState("");
    const [replies, setReplies] = useState(0);

    const [replyDiv, setReplyDiv] = useState([]);
    const [retweetDiv, setRetweetDiv] = useState([]);
    const [repliesDiv, setRepliesDiv] = useState([]);

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
        setReplies(result.data.replyCount);
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
            setLikes(likes + 1);
        } else {
            await axios({
                method: 'put',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID + '/unlike',
                withCredentials: true,
            });
            setLikeButton("Like");
            setLikes(likes - 1);
        }
    }

    useEffect(() => {
        retrieveTweet();
    }, []);

    // to do
    // maybe get rid if the likes and retweet number in the button
    // put number of replies in the reply button ex: see replies (3)

    // maybe specify if a tweet is a retweet
    // show the original tweet; may do this in retweetform component

    return (
        <div className="tweet">
            <p>{author}</p>
            <p>{text}</p>
            <p>{"likes: " + likes}</p>
            <p>{"retweets: " + retweets}</p>
            <button onClick={e => {e.preventDefault(); likeTweet()}} >{likeButton + " (" + likes + ")"}</button>
            <button onClick={e => {e.preventDefault(); setReplyDiv(<ReplyForm tweetID = {props.tweetID} setReplyDiv = {setReplyDiv} />) }} >Reply</button>
            <button onClick={e => {e.preventDefault(); setRetweetDiv(<RetweetForm tweetID = {props.tweetID} 
                setRetweetDiv = {setRetweetDiv} setRetweets = {setRetweets} retweets = {retweets} />) }} >Retweet {" (" + retweets + ")"}
            </button>
            <button onClick={e => {e.preventDefault(); setRepliesDiv(<RepliesView tweetID = {props.tweetID} 
                setRepliesDiv = {setRepliesDiv} setReplies = {setReplies} replies = {replies} />) }} >See Replies {" (" + replies + ")"}
            </button>
            <div className="overlay">{replyDiv}</div>
            <div className="overlay">{retweetDiv}</div>
            <div className="overlay">{repliesDiv}</div>
        </div>
    );
}

export default Tweet;