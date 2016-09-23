import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Loading from 'components/Loading';
import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import ThreadActions from 'components/ThreadActions';

import { requireThread } from 'hocs/resources';

const mapStateToProps = ({ threads, theme }, { id }) => {
  return {
    thread: threads[id],
    theme
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

class Thread extends Component {
  render() {
    const { id, thread, push, zDepth, theme } = this.props;
    return (
      <Card
        onClick={() => push('/threads/' + id)}
        style={theme.thread.root}
        zDepth={zDepth}
      >
        <CardMedia
          overlay={<CardTitle title={thread.title} subtitle="Thread description" />}
        >
          <div id='resource-image'>
            <h1>IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE</h1>
          </div>
        </CardMedia>
        <CardText>
          <FontIcon
            children="chat_bubble_outline"
            className="material-icons"
          />
          {`  ${thread.posts}  `}
        </CardText>
        <CardActions expandable={true}>
          <ThreadActions id={id} />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireThread(Thread));
