import React, { Component } from 'react';
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
import AllComments from './components/AllComments'
import ErrorPage from './components/ErrorPage'





class App extends Component {

  state = {
    loggedInUser: null,
    users: []
  }

  logInUser = (username) => {
    this.setState({ loggedInUser: username })
  }

  render() {
    const { loggedInUser } = this.state
    return (
      <div className="App" >

        <Header loggedInUser={loggedInUser} logInUser={this.logInUser} />
        <Nav />
        <br></br>
        <br></br>
        <br></br>

        <Router>
          <Home path="/" />
          <AllArticles path="/articles/" />
          <Article path="/articles/:article_id/*" loggedInUser={this.state.loggedInUser} />
          <ArticleComments path="/articles/:article_id/comments" />
          <Topics path="/topics" />
          <AllComments path="/comments" />

          <ErrorPage default status={404} msg={'Page not found'} />

        </Router>
      </div>
    );

  }
}

export default App;
