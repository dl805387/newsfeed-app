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

    // These below are for inserting components
    const [replyDiv, setReplyDiv] = useState([]);
    const [retweetDiv, setRetweetDiv] = useState([]);
    const [repliesDiv, setRepliesDiv] = useState([]);
    const [editDiv, setEditDiv] = useState([]);

    // These are for showing the original tweet if the tweet is a retweet
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

        if (result.data.type === "retweet" && result.data.parent !== undefined) {
            setOriTweet(result.data.parent.body);
            setOriAuthor(result.data.parent.author);
            setIsOri("Retweet");
        }

        return result;
    }

    useEffect(() => {
        retrieveTweet();
    }, []);

    // to do
    // implement update and delete tweet
    // this will show likes but no button

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

            <button onClick={e => {e.preventDefault(); setEditDiv(<EditForm tweetID = {props.tweetID} setEditDiv = {setEditDiv} setText = {setText} />) }} >Edit</button>

            <button onClick={e => {e.preventDefault(); setReplyDiv(<ReplyForm tweetID = {props.tweetID} setReplyDiv = {setReplyDiv} 
                setReplies = {setReplies} replies = {replies} />) }} >Reply
            </button>

            <button onClick={e => {e.preventDefault(); setRetweetDiv(<RetweetForm tweetID = {props.tweetID} 
                setRetweetDiv = {setRetweetDiv} setRetweets = {setRetweets} retweets = {retweets} />) }} >Retweet {" (" + retweets + ")"}
            </button>

            <button onClick={e => {e.preventDefault(); setRepliesDiv(<RepliesView tweetID = {props.tweetID} 
                setRepliesDiv = {setRepliesDiv} />) }} >See Replies {" (" + replies + ")"}
            </button>
            
            <div className="overlay">{replyDiv}</div>
            <div className="overlay">{retweetDiv}</div>
            <div className="overlay">{repliesDiv}</div>
            <div className="overlay">{editDiv}</div>

        </div>
    );
}

export default MyTweet;