import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from '../Home';
import PostView from '../PostView';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: localStorage.getItem('searchText'),
      result: JSON.parse(localStorage.getItem('posts'))
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  handleSubmit(value) {
    this.setState({
      result: value
    });
  }

  handleReset() {
    this.setState({
      value: '',
      result: null
    });
  }

  render() {

    const posts = this.state.result;
    const searchText = this.state.value;

    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('searchText', searchText);

    return(
      <Router>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Home
              {...routeProps}
              value={searchText}
              onReset={this.handleReset}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              posts={posts} />
          )} />
        <Route
          path="/post/:id"
          render={(routeProps) => (
            <PostView
              {...routeProps}
              posts={posts} />
          )} />
      </Router>
    );
  }

}