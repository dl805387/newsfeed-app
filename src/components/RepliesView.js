import React, { useState, useEffect } from "react";
import Tweet from './Tweet';
import MyTweet from './MyTweet';
const axios = require('axios').default;

function RepliesView(props) {

    const [repliesData, setRepliesData] = useState([]);
    
    // Get replies for a tweet using id
    const retrieveReplies = async () => {
        const result = await axios({
            method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + props.tweetID,
            withCredentials: true,
        });
        
        let array = [];
        if (result.data.replyCount !== 0) {
            result.data.replies.map(x => {
                return array.push(x);
            });
        }
        setRepliesData(array);
        return result;
    }

    useEffect(() => {
        retrieveReplies();
    }, []);

    // to do
    // maybe say no replies if they are no replies
    
    return (
        <div className="overlay">
            <div className="repliesView">
                <p>replies</p>

                {repliesData.map(x => {
                    if (x.isMine === true) {
                        return <MyTweet tweetID = {x.id} key = {x.id} setShowTweets = {props.setShowTweets} setShowMyTweets = {props.setShowMyTweets} setDarkCover = {props.setDarkCover} />
                    } else {
                        return <Tweet tweetID = {x.id} key = {x.id} setShowTweets = {props.setShowTweets} setShowMyTweets = {props.setShowMyTweets} setDarkCover = {props.setDarkCover} />
                    }
                })}

                <button onClick={e => {e.preventDefault(); props.setRepliesDiv(false); props.setDarkCover(false); }}>Close</button>
            </div>
        </div>
    );
}

export default RepliesView;