import React from 'react';
import './App.css';
import Header from './components/header'
import Home from './components/Home'
import { Router } from '@reach/router';
import Nav from './components/nav';
import AllArticles from './components/AllArticles'
import Article from './components/Article'
import ArticleComments from './components/ArticleComments'
import Topics from './components/Topics'
// import Footer from './components/Footer'



function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <br></br>
      <br></br>
      <br></br>

      <Router>
        <Home path="/" />
        <AllArticles path="/articles/" />
        <Article path="/articles/:article_id/*" />
        {/* <Comments path="/articles/:article_id/comments" /> */}
        <Topics path="/topics" />
      </Router>
    </div>
  );
}

export default App;
