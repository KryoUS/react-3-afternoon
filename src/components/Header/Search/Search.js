import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    }
  }

  updateSearchText = ( searchText ) => {
    this.setState({ searchText })
    this.props.searchFn(this.state.searchText)
  }

  render() {
    const { searchText } = this.state;
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed"
                 value={ searchText } 
                 onChange={ (e) => this.updateSearchText( e.target.value ) }/>

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}