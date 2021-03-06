import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { NewsFeedEntry } from './NewsFeedEntry';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setPosts();
  }

  componentWillReceiveProps() {
    // This will trigger when new post added to database
    NewsFeed.posts = this.props.posts;
    this.props.setPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="newsfeed-container">
        {posts.map(post => (
          <NewsFeedEntry
            key={post._id}
            post={post}
          />
        ))}
      </div>
    );
  }
}