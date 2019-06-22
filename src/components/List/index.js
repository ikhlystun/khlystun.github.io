import React, { Component } from 'react';

import Post from '../Post';

export default class List extends Component {

  render() {

    const { posts } = this.props;
    let postsArr = [];

    if ( Array.isArray(posts) ) {

      posts.forEach(post => {
        postsArr.push(
          <Post key={post.id} post={post} />
        );
      });

    }

    return (
      <div className="container">
        <div className="row">
          {postsArr}
        </div>
      </div>
    );

  }

}