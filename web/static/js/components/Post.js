import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { compose } from 'recompose';
import { grey300, grey50 } from 'material-ui/styles/colors';

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
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = {
      open: false
    }
  }

  click() {
    this.setState({open: ! this.state.open});
  }

  render() {
    const { isOwned, id, post, push } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Divider
          style={{
            backgroundColor: isOwned ? grey50 : null,
          }}
        />
        <div
          style={{
            padding: '5px 12px',
            backgroundColor: isOwned ? grey300 : null,
            zDepth: 0,
          }}
          onClick={this.click}
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
        {
          open
          ? <PostActions id={id} />
          : null
        }
      </div>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), requirePost, checkPostOwned)(Post);
