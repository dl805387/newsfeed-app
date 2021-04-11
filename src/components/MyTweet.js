import React, { useState, useEffect } from "react";
import RepliesView from "./RepliesView";
import ReplyForm from "./ReplyForm";
import RetweetForm from "./RetweetForm";
import EditForm from "./EditForm";
const axios = require('axios').default;

function MyTweet(props) {

    const [text, setText] = useState("");
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);
    const [author, setAuthor] = useState("");
    const [replies, setReplies] = useState(0);

    // These below are used for inserting components when state becomes true
    const [replyDiv, setReplyDiv] = useState(false);
    const [retweetDiv, setRetweetDiv] = useState(false);
    const [repliesDiv, setRepliesDiv] = useState(false);
    const [editDiv, setEditDiv] = useState(false);

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
        setReplies(result.data.replyCount);

        // Shows original tweet if this tweet is a retweet
        if (result.data.type === "retweet" && result.data.parent !== undefined) {
            setOriTweet(result.data.parent.body);
            setOriAuthor(result.data.parent.author);
            setIsOri("Retweet");
        }

        return result;
    }

    // Deletes the tweet from the database
    const deleteTweet = async () => {
        const result = await axios({
            method: 'delete',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID,
            withCredentials: true,
        });

        // re-renders tweets
        // re-rendering will be based on if you are viewing tweets or my tweets
        if (props.setShowMyTweets === undefined) {
            props.setShowTweets(false);
            props.setShowTweets(true);
        } else {
            props.setShowMyTweets(false);
            props.setShowMyTweets(true);
        }

        // turn off dark cover
        props.setDarkCover(false);

        return result;
    }

    // Turns off the style for retweet if the tweet is not a retweet
    const isRetweet = () => {
        if (isOri === "") {
            return "revert";
        }
    }

    // If tweet is a retweet, then this will return "<author name> retweeted"
    const retweetHeader = () => {
        if (isOri === "") {
            return isOri;
        } else {
            return author + " " + isOri + "ed";
        }
    }

    useEffect(() => {
        retrieveTweet();
    }, []);

    return (
        <div>

            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{author}</p>
                </header>

                <div className="card-content">
                    <div className="content"> 
                        <p>{text}</p>

                        <p className="isOri" style={{all: isRetweet()}}>{retweetHeader()}</p>
                        <div className="retweet" style={{all: isRetweet()}}>
                            <p>{oriAuthor}</p>
                            <p>{oriTweet}</p>
                        </div>

                        <div className="counters">
                            <p className="likesRet">{"likes: " + likes}</p>
                            <p className="likesRet">{"retweets: " + retweets}</p>
                        </div>
                    </div>
                </div>

                <footer className="card-footer">
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); setEditDiv(true); props.setDarkCover(true); }} >Edit</button>
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); setReplyDiv(true); props.setDarkCover(true); }} >Reply</button>
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); setRetweetDiv(true); props.setDarkCover(true); }} >Retweet</button>
                    <button className="button is-info is-outlined card-footer-item" onClick={e => {e.preventDefault(); setRepliesDiv(true); props.setDarkCover(true); }} >See Replies {" (" + replies + ")"}</button>
                    <button className="button is-danger is-outlined card-footer-item" onClick={e => {e.preventDefault(); deleteTweet()}} >Delete</button>
                </footer> 
            </div>

            { editDiv && (<EditForm tweetID = {props.tweetID} setEditDiv = {setEditDiv} setText = {setText} originalText = {text} setDarkCover = {props.setDarkCover} />) }
            { replyDiv && (<ReplyForm tweetID = {props.tweetID} setReplyDiv = {setReplyDiv} setReplies = {setReplies} replies = {replies} setDarkCover = {props.setDarkCover} />) }
            { retweetDiv && (<RetweetForm tweetID = {props.tweetID} setRetweetDiv = {setRetweetDiv} setShowTweets = {props.setShowTweets} setShowMyTweets = {props.setShowMyTweets} setDarkCover = {props.setDarkCover} />) }
            { repliesDiv && (<RepliesView tweetID = {props.tweetID} setRepliesDiv = {setRepliesDiv} setShowTweets = {props.setShowTweets} setShowMyTweets = {props.setShowMyTweets} setDarkCover = {props.setDarkCover} />) }

        </div>
    );
}

export default MyTweet;