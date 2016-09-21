import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
        style={theme.thread.root}
        zDepth={zDepth}
      >
        <CardHeader
          style={theme.thread.header}
          title={<ResourceTitle
            user={thread.user_id}
            title=""
            insertedAt={thread.insertedAt}
          />}
          showExpandableButton={true}
        />
        <Divider />
        <CardText
          style={theme.thread.body}
          onClick={() => push('/threads/' + id)}
          style={{
            cursor: 'pointer',
          }}
        >
          {`${thread.title} (${thread.posts})`}
        </CardText>
        <CardActions expandable>
          <ThreadActions id={id} />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireThread(Thread));
