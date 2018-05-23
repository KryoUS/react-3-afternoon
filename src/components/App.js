import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';
import Search from './Header/Search/Search';

const apiPosts = 'https://practiceapi.devmountain.com/api/posts'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios({
      method: 'GET',
      url: apiPosts
    }).then(response => {
      this.setState({ posts: response.data })
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then(response => {
      this.setState({ posts: response.data })
    })
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then(response => {
      this.setState({ posts: response.data })
    })
  }

  createPost( text ) {
    axios.post(apiPosts, { text }).then(response => {
      this.setState({ posts: response.data })
    })
  }

  search = ( searchText ) => {
    this.state.posts.find(function (e) {
      return e.text === searchText
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={ this.search }/>

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map(post => (
              <Post key={ post.id } 
                text={ post.text } 
                date={ post.date }
                id={ post.id }
                updatePostFn={ this.updatePost }
                deletePostFn={ this.deletePost } />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
