import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import FontIcon from 'material-ui/FontIcon';
import { grey900 } from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

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
    const title = <div>
      <FontIcon
        children="forum"
        color={grey900}
        className="material-icons"
      />
      {`  ${thread.title}  `}
    </div>
    return (
      <Card
        onClick={() => push('/threads/' + id)}
        style={theme.thread.root}
        zDepth={zDepth}
      >
        <CardTitle title={title} subtitle="Thread description" />
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
