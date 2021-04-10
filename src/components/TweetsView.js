import React, { useState, useEffect } from "react";
import Tweet from './Tweet';
import MyTweet from './MyTweet';
const axios = require('axios').default;

function TweetsView(props) {

    const [tweetsData, setTweetsData] = useState([]);

    const retrieveTweets = async () => {
        const result = await axios({
            method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
        });
        setTweetsData(result.data);
        return result;
    }

    useEffect(() => {
        retrieveTweets();
    }, []);

    return (
        <div>
            <div className="tweetsView">
                {tweetsData.slice([0], [50]).map(x => {
                    if (x.isMine === true) {
                        return <MyTweet tweetID = {x.id} key = {x.id} setShowTweets = {props.setShowTweets} setDarkCover = {props.setDarkCover} />
                    } else {
                        return <Tweet tweetID = {x.id} key = {x.id} setShowTweets = {props.setShowTweets} setDarkCover = {props.setDarkCover} />
                    }
                })}
            </div>
        </div>
    );
}

export default TweetsView;