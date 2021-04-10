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

    // Turns off the style for retweet if the tweet is not a retweet
    const isRetweet = () => {
        if (isOri === "") {
            return "revert";
        }
    }

    useEffect(() => {
        retrieveTweet();
    }, []);

    return (
        <div className="tweet">

            <div className="card">

                <header className="card-header">
                    <p className="card-header-title">{author}</p>
                </header>

                <div className="card-content">
                    <div className="content">
                        <p>{text}</p>

                        <p className="isOri" style={{all: isRetweet()}}>{author + " " + isOri + "ed"}</p>
                        <div className="retweet" style={{all: isRetweet()}}>
                            <p>{oriAuthor}</p>
                            <p>{oriTweet}</p>
                        </div>

                        <div className="counters">
                            <p className="likes">{"likes: " + likes}</p>
                            <p>{"retweets: " + retweets}</p>
                        </div>
                    </div>
                </div>

                <footer className="card-footer">
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); likeTweet()}} >{likeButton}</button>
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); setReplyDiv(true); props.setDarkCover(true); }} >Reply</button>
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); setRetweetDiv(true); props.setDarkCover(true); }} >Retweet</button>
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); setRepliesDiv(true); props.setDarkCover(true); }} >See Replies {" (" + replies + ")"}</button>
                </footer>   
            </div> 

            { replyDiv && (<ReplyForm tweetID = {props.tweetID} setReplyDiv = {setReplyDiv} setReplies = {setReplies} replies = {replies} setDarkCover = {props.setDarkCover} />) }
            { retweetDiv && (<RetweetForm tweetID = {props.tweetID} setRetweetDiv = {setRetweetDiv} setShowTweets = {props.setShowTweets} setDarkCover = {props.setDarkCover} />) }
            { repliesDiv && (<RepliesView tweetID = {props.tweetID} setRepliesDiv = {setRepliesDiv} setShowTweets = {props.setShowTweets} setDarkCover = {props.setDarkCover} />) }
                
        </div>
    );
}

export default Tweet;