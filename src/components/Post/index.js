import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';


export default class Post extends Component {

  render() {

    const { post } = this.props;
    const posterUrl = 'https://image.tmdb.org/t/p/w300/';
    const noPosterUrl = 'http://www.sclance.com/pngs/no-image-png/no_image_png_935227.png';

    return(
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="post">
          <Link to={'/post/' + post.id} className="post__img">
            <img src={ (post.poster_path != null) ? posterUrl + post.poster_path : noPosterUrl} alt={post.title || post.name} />
          </Link>
          <Link to={'/post/' + post.id}>{post.title || post.name}</Link>
        </div>
      </div>
    );
  }

}