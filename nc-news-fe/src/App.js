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
import Axios from 'axios';

class App extends Component {

  state = {
    loggedInUser: null,
    users: [],
    validUser: false,
    isLoggedIn: false
  }

  fetchUsers = () => {
    return Axios.get('https://nc-news-heroku.herokuapp.com/api/users')
  }

  componentDidMount() {
    this.fetchUsers()
      .then(res => {
        this.setState({ users: res.data.users.map(user => user.username) });
      });
  }


  logInUser = (username) => {


    if (this.state.users.includes(username)) {

      this.setState({ loggedInUser: username, validUser: true, isLoggedIn: true })
    }

  }

  render() {
    // console.log(this.state)
    const { loggedInUser } = this.state
    return (
      <div className="App" >

        <Header loggedInUser={loggedInUser} logInUser={this.logInUser} validUser={this.validUser} />
        <Nav />
        <br></br>
        <br></br>
        <br></br>

        <Router>
          <Home path="/" />
          <AllArticles path="/articles/" />
          <Article path="/articles/:article_id/*" loggedInUser={this.state.loggedInUser} isLoggedIn={this.state.isLoggedIn} />
          {/* <ArticleComments path="/articles/:article_id/comments" loggedInUser={this.state.loggedInUser} isLoggedIn={this.state.isLoggedIn} /> */}
          <Topics path="/topics" />
          <AllComments path="/comments" />

          <ErrorPage default status={404} msg={'Page not found'} />

        </Router>
      </div>
    );

  }
}

export default App;
