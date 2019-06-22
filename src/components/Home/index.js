import React, { Component, Fragment } from 'react';

import Nav from '../Nav';
import Search from '../Search';
import List from '../List';


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  handleSubmit(value) {
    this.props.onSubmit(value);
  }

  handleReset() {
    this.props.onReset();
  }

  render() {

    const posts = this.props.posts;
    const searchText = this.props.value;

    return(
      <Fragment>
        <Nav />
        <Search
          value={searchText}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        />
        <List posts={posts} />
      </Fragment>
    );
  }

}