import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import PostForm from 'components/PostForm';
import { SignedIn } from 'components/util';
import Post from 'components/Post';

import {
  openThreadPage,
  closeThreadPage
} from 'actions/threadPage';
import { submitPost } from 'actions/resources';

import ThreadHeader from 'components/pages/thread/ThreadHeader'

const mapStateToProps = ({ threadPage }, { params }) => {
  return {
    posts: threadPage.posts,
    id: params.id
  }
}

const actionCreaters = {
  submitPost, openThreadPage, closeThreadPage
};

class Thread extends Component {
  constructor(props, context) {
    super(props, context)
    this.post = this.post.bind(this);
  }

  componentDidMount() {
    const { openThreadPage, id } = this.props;
    openThreadPage(id);
  }

  componentWillUnmount() {
    const { closeThreadPage, id } = this.props;
    closeThreadPage(id);
  }

  post({ user, title, text }) {
    const { submitPost, id } = this.props;
    submitPost({thread: id, user, title, text});
  }

  render() {
    const {
      posts, params, theme
    } = this.props;
    return (
      <div>
        <div id='thread-header'>
          <ThreadHeader id={params.id} />
        </div>
        <Divider style={{ margin: '0.15em 0' }} />
        <SignedIn><PostForm
            submit={this.post}
            expandable
            expand={false}
            zDepth={2}
          /></SignedIn>
        <Divider style={{ margin: '1em 0' }} />
        {
          posts.map(id => (
            <Post
              key={id}
              id={id}
            />
          ))
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreaters)(Thread);
