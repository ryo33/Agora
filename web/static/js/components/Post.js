import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { compose } from 'recompose';
import { grey200 } from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Linkify from 'react-linkify';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import PostActions from 'components/PostActions';

import { requirePost, checkPostOwned } from 'hocs/resources';

const mapStateToProps = ({ posts }, { id }) => {
  return {
    post: posts[id],
  };
};

const actionCreators = {
  push
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    dispatch
  };
};

class Post extends Component {
  render() {
    const { isOwned, id, post, push } = this.props;
    console.log(isOwned)
    return (
      <div
        style={{
          padding: '5px 2px',
          backgroundColor: isOwned ? grey200 : null,
          zDepth: 0,
        }}
      >
        <ResourceTitle
          user={post.user_id}
          title={post.title}
          path={'/posts/' + id}
          insertedAt={post.inserted_at}
        />
        <pre
          style={{
            fontSize: '1.0em',
            whiteSpace: "pre-wrap",
            margin: "0px",
            padding: "8px 8px",
          }}
        >
          <Linkify properties={{target: '_blank'}}>
            {post.text}
          </Linkify>
        </pre>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), requirePost, checkPostOwned)(Post);
