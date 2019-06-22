import React, { Component, Fragment } from 'react';

import Nav from '../Nav';

import './style.css';

export default class PostView extends Component {

  render() {

    const posts = JSON.parse(localStorage.getItem('posts'))
    const postId = this.props.match.params.id;
    const post = posts.find(post => +post.id === +postId);
    const posterUrl = 'https://image.tmdb.org/t/p/w500/';
    const noPosterUrl = 'http://www.sclance.com/pngs/no-image-png/no_image_png_935227.png';

    console.log(post);

    return(
      <Fragment>
        <Nav />
        <div className="container">
          <div className="post-view row">
            <div className="post-view__img col-md-5 col-lg-4">
              <img src={ (post.poster_path != null) ? posterUrl + post.poster_path : noPosterUrl } alt={ post.title || post.name } />
            </div>
            <div className="post-view__info col-md-7 col-lg-8">
              <h2 className="post-view__title">{ post.title || post.name }</h2>
              <p className="post-view__desc">{ post.overview }</p>
              { post.vote_average ? (<div className="post-view__meta"><strong>Rating:</strong> { post.vote_average }</div>) : ('') }
              { post.release_date || post.first_air_date ? (<div className="post-view__meta"><strong>Date:</strong> { post.release_date || post.first_air_date }</div>) : ('') }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

}