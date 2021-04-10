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

    // These below are used for inserting components when state becomes true
    const [replyDiv, setReplyDiv] = useState(false);
    const [retweetDiv, setRetweetDiv] = useState(false);
    const [repliesDiv, setRepliesDiv] = useState(false);

    // These are for the retweeted tweet
    const [oriTweet, setOriTweet] = useState("");
    const [oriAuthor, setOriAuthor] = useState("");
    const [isOri, setIsOri] = useState("");

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

        // Shows original tweet if this tweet is a retweet
        if (result.data.type === "retweet" && result.data.parent !== undefined) {
            setOriTweet(result.data.parent.body);
            setOriAuthor(result.data.parent.author);
            setIsOri("Retweet");
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
    // maybe get rid of the likes and retweet number in the button

    return (
        <div className="tweet">
            <p>{isOri}</p>
            <p>{author}</p>
            <p>{text}</p>
            <p>{"likes: " + likes}</p>
            <p>{"retweets: " + retweets}</p>

            <div>
                <p>{oriAuthor}</p>
                <p>{oriTweet}</p>
            </div>

            <button onClick={e => {e.preventDefault(); likeTweet()}} >{likeButton + " (" + likes + ")"}</button>
            <button onClick={e => {e.preventDefault(); setReplyDiv(true) }} >Reply</button>
            <button onClick={e => {e.preventDefault(); setRetweetDiv(true) }} >Retweet {" (" + retweets + ")"}</button>
            <button onClick={e => {e.preventDefault(); setRepliesDiv(true) }} >See Replies {" (" + replies + ")"}</button>
            
            { replyDiv && (<ReplyForm tweetID = {props.tweetID} setReplyDiv = {setReplyDiv} setReplies = {setReplies} replies = {replies} />) }
            { retweetDiv && (<RetweetForm tweetID = {props.tweetID} setRetweetDiv = {setRetweetDiv} setRetweets = {setRetweets} retweets = {retweets} />) }
            { repliesDiv && (<RepliesView tweetID = {props.tweetID} setRepliesDiv = {setRepliesDiv} />) }

        </div>
    );
}

export default Tweet;