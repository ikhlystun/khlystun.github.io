import React, { Component } from 'react';


const API_KEY = '2d94eb1d15a9cdc01a2f012d877c3d87';

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleSubmit(event) {

    const searchText = this.props.value;
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en&query=${searchText}`;

    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject();
        }

        return response.json();
      })
      .then((output) => {
        this.props.onSubmit(output.results);
      })
      .catch((reason) => {
        this.props.onSubmit(null);
      });

    event.preventDefault();
  }

  handleReset(event) {
    this.props.onReset();
    event.preventDefault();
  }


  render() {
    return(
      <div className="container">
        <div className="jumbotron">
          <h3 className="text-center">Find films</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.props.value} onChange={this.handleChange} className="form-control" placeholder="Game of thrones..." />
            <button type="button" className="btn btn-danger" onClick={this.handleReset} style={{ marginTop: 20 + 'px' }}>Reset search</button>
          </form>
        </div>
      </div>
    );
  }

}