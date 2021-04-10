import './App.css';
import React, { useState, useEffect } from "react";
import PostForm from './components/PostForm';
import TweetsView from './components/TweetsView';
const axios = require('axios').default;

function App() {

    //
    const [show, setShow] = useState(false);
    //

    useEffect(() => {
        //retrieveTweets();
        setShow(true);
    }, []);

    // to do

    // if i make a post, the tweets does not re render

    // maybe add a mytweets button
    // this displays all the tweets

    return (
        <div className="App">
            <PostForm />
            <button onClick={e => {e.preventDefault(); setShow(false); }}>do not show</button>
            { show && (<TweetsView setShow = {setShow} />) }
            
        </div>
    );
}

export default App;
