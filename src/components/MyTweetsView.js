import React, { useState, useEffect } from "react";
import MyTweet from './MyTweet';
const axios = require('axios').default;

// This component will only render my tweets
function MyTweetsView(props) {

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
            <div>
                {tweetsData.slice([0], [50]).map(x => {
                    if (x.isMine === true) {
                        return <MyTweet tweetID = {x.id} key = {x.id} setShowMyTweets = {props.setShowMyTweets} />
                    }
                })}
            </div>
        </div>
    );
}

export default MyTweetsView;