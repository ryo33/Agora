import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontIcon from 'material-ui/FontIcon';
import { grey900 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardActions } from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import ThreadActions from 'components/ThreadActions';

import { requireThread } from 'hocs/resources';

const mapStateToProps = ({ theme, threads }, { id }) => {
  return {
    thread: threads[id],
  }
};

class ThreadHeader extends Component {
  render() {
    const { id, thread } = this.props;
    const title = <div>
      {`  ${thread.title}  `}
      <span>
        <FontIcon
          children="chat_bubble_outline"
          color={grey900}
          className="material-icons"
        />
        {`  ${thread.posts}  `}
      </span>
    </div>
    return (
      <Card
        initiallyExpanded={false}
      >
        <CardTitle
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
          subtitle="Thread description"
        />
        <CardActions expandable={true}>
          <ThreadActions id={id} />
        </CardActions>
    </Card>
    );
  }
}

export default connect(mapStateToProps)(requireThread(ThreadHeader));
