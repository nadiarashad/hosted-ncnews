import React from 'react';
import Topics from './Topics'


const Home = (props) => {
    return (
        <div>
            <br></br>
            <br></br>
            <h2>Welcome to Northcoders News! <br></br> <br></br>The one place to give you all the juicy gossip on your favourite topics, Footie, Cooking ond obviously your favourite Coding!!! </h2>
            <br></br><br></br>
            <Topics path="/topics/" articles={props.articles} />
        </div>
    );
};

export default Home;