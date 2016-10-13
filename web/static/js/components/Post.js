import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import MaterialColors from 'material-colors';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Linkify from 'react-linkify';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import PostActions from 'components/PostActions';

import { requirePost } from 'hocs/resources';

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
    const { id, post, push } = this.props;
    return (
      <Paper
        style={{
          padding: '5px 2px',
          zDepth: 0,
          backgroundColor: MaterialColors.blueGrey[100]
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
            whiteSpace: "pre-wrap",
            margin: "0px",
            padding: "10px 6px",
            backgroundColor: MaterialColors.grey[50]
          }}
        >
          <Linkify properties={{target: '_blank'}}>
            {post.text}
          </Linkify>
        </pre>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requirePost(Post));
