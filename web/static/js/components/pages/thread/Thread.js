import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import PostForm from 'components/PostForm';
import { SignedIn } from 'components/util';
import Post from 'components/Post';
import ResourceTitle from 'components/ResourceTitle';

import {
  openThreadPage,
  closeThreadPage,
  updateCurrentThread,
  fetchThreadContents,
  receivePosts
} from 'actions/threads';
import { submitPost } from 'actions/posts';
import ThreadComponent from 'components/Thread';

const mapStateToProps = ({ threads, theme }) => {
  const thread = threads.threads[threads.currentThread];
  const currentThread = threads.currentThread;
  let props = thread
    ? {
      currentThread: currentThread,
      title: thread.title,
      insertedAt: thread.insertedAt,
      parentGroup: thread.parentGroup,
      user: thread.user,
      postsMap: thread.postsMap,
      postsList: thread.postsList,
      isFetchingThreadContents: threads.isFetchingThreadContents[currentThread],
      isFetchingMissingPosts: threads.isFetchingMissingPosts[currentThread],
    }
    : {};
  return Object.assign(props, { theme });
};

const actionCreaters = {
  submitPost, openThreadPage, closeThreadPage
};

class Thread extends Component {
  constructor(props, context) {
    super(props, context)
    this.post = this.post.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.id;
    const { openThreadPage } = this.props;
    openThreadPage(id);
  }

  componentWillUnmount() {
    const id = this.props.params.id;
    const { closeThreadPage } = this.props;
    closeThreadPage(id);
  }

  transitionTo(path) {
    const { push } = this.props;
    return () => {
      push(path);
    };
  }

  post(post) {
    post = Object.assign({}, post, {
      thread_id: this.props.params.id,
    });
    const { submitPost } = this.props;
    console.log(post)
    submitPost(post)
  }

  render() {
    const {
      postsMap, postsList, currentThread,
      isFetchingMissingPosts,
      isFetchingThreadContents,
      theme,
      params, user, title, insertedAt
    } = this.props;
    if (isFetchingThreadContents) {
      return <p>Fetching the contents</p>;
    } else if (isFetchingMissingPosts) {
      return <p>Fetching the missing contents</p>;
    } else if (postsList) {
      return (
        <div>
          <ThreadComponent
            id={params.id}
            user={user}
            title={title}
            insertedAt={insertedAt}
          />
          <Divider style={{ margin: '0.15em 0' }} />
          <SignedIn><PostForm
              submit={this.post}
              expandable
              expand={false}
              zDepth={2}
            /></SignedIn>
          <Divider style={{ margin: '1em 0' }} />
          {postsList.map((id) => postsMap.hasOwnProperty(id)
            ? <Post
              key={id}
              id={id}
              title={postsMap[id].title}
              text={postsMap[id].text}
              user={postsMap[id].user}
              insertedAt={postsMap[id].inserted_at}
            />
            : null)}
          </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, actionCreaters)(Thread);
