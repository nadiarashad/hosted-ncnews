import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Home from './components/Home'
import { Router } from '@reach/router';
import PageNav from './components/nav';
import AllArticles from './components/AllArticles'
import Article from './components/Article'
import Topics from './components/Topics'
import AllComments from './components/AllComments'
import ErrorPage from './components/ErrorPage'
import Axios from 'axios';
// import * as api from './api';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {

  state = {
    loggedInUser: null,
    users: [],
    validUser: false,
    isLoggedIn: false,
    // articles: []
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
    console.log(this.state)
    const { loggedInUser, users } = this.state
    return (
      <div className="App" >


        <Header loggedInUser={loggedInUser} logInUser={this.logInUser} validUser={this.validUser} />
        <PageNav />
        <br></br>
        <br></br>
        <br></br>

        <Router>
          <Home path="/" />
          <AllArticles path="/articles/*" users={users} />
          <Article path="/articles/:article_id/*" loggedInUser={this.state.loggedInUser} isLoggedIn={this.state.isLoggedIn} articles={this.state.articles} />
          <Topics path="/topics/" />
          <AllComments path="/comments" />
          <ErrorPage default status={404} msg={'Page not found'} />

        </Router>
      </div>
    );

  }
}

export default App;
