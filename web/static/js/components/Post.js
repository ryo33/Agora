import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import PostActions from 'components/PostActions';

import { requirePost } from 'hocs/resources';

const mapStateToProps = ({ posts, theme }, { id }) => {
  return {
    post: posts[id],
    theme,
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
    const { id, post, push, zDepth, theme } = this.props;
    return (
      <Card
        style={theme.post.root}
        zDepth={zDepth}
      >
        <CardHeader
          style={theme.post.header}
          title={<ResourceTitle
            user={post.user_id}
            title={post.title}
            path={'/posts/' + id}
            insertedAt={post.inserted_at}
          />}
          showExpandableButton
        />
        <Divider />
        <CardText
          style={theme.post.body}
          actAsExpander
        >
          {post.text}
        </CardText>
        <Divider />
        <CardActions expandable>
          <PostActions id={id} />
        </CardActions>
        </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requirePost(Post));
