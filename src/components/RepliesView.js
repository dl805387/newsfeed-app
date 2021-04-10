import React, { useState, useEffect } from "react";
import Tweet from './Tweet';
const axios = require('axios').default;

function RepliesView(props) {

    const [ids, setIds] = useState([]);
    
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
                return array.push(x.id);
            });
        }
        setIds(array);
        return result;
    }

    useEffect(() => {
        retrieveReplies();
    }, []);

    // to do
    // retweet a reply is broken
    // and a bunch of other stuff too probably because of the props issue
    // reply need to generate mytweet aswell
    
    return (
        <div className="overlay">
            <div className="repliesView">
                <p>replies</p>

                {ids.map(x => {
                    return <Tweet tweetID = {x} key = {x}/>
                })}

                <button onClick={e => {e.preventDefault(); props.setRepliesDiv(false);}}>Close</button>
            </div>
        </div>
    );
}

export default RepliesView;