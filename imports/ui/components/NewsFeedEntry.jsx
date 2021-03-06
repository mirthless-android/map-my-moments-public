import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col, Button, Thumbnail } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export class NewsFeedEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: this.props.post.likes,
      liked: false
    };
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike() {
    this.setState({ 
      liked: !this.state.liked,
    });
    this.updateLikes();
  }

  updateLikes() {
    var likeCount = this.state.liked ? this.state.likes - 1 : this.state.likes + 1;
    this.setState({ likes: likeCount });
    Meteor.call('posts.updateLikes', this.props.post._id, likeCount);
  }

  render() {
    const likeText = this.state.likes === 1 ? 'like': 'likes'; 
    const likedButton = this.state.liked ? 'Liked': 'Like';
    return (
      <Grid>
        <Row>
        <Col xs={12} md={4}>
          <Thumbnail src={this.props.post.picURL} alt='200x200'>
            <div className='text-left'>
              <label>
                <span className="glyphicon glyphicon-heart" aria-hidden="true"> </span>
                <span> {this.state.likes} {likeText}</span>
              </label>
              <p>{this.props.post.username}</p>
              <h4>{this.props.post.caption}</h4>
              <div>
                <Button bsStyle="info" bsSize="small" onClick={this.toggleLike}>{likedButton}</Button>&nbsp;
              </div>
            </div>
          </Thumbnail>
        </Col>
        </Row>
      </Grid>
    );
  };
}
