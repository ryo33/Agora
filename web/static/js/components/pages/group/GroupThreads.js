import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import { joinGroupChannel, leaveChannel } from '../../../socket';
import { SignedIn } from 'components/util';
import ResourceTitle from 'components/ResourceTitle';
import Group from 'components/Group';
import Thread from 'components/Thread';
import ThreadForm from 'components/ThreadForm';

import { openGroupThreadsTab, addThread } from 'actions/groupPage';

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    threads: groupPage.groupThreads,
    id: params.id
  };
};

const actionCreators = {
  openGroupThreadsTab, addThread
};

class GroupThreads extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { openGroupThreadsTab, id } = this.props;
    openGroupThreadsTab(id);
  }

  submit({ user, title }) {
    const { id, addThread } = this.props;
    addThread(id, user, title)
  }

  render() {
    const { threads, theme } = this.props;
    return (
      <div>
        <Divider style={{margin: "0.15em 0"}} />
        <SignedIn><ThreadForm
            submit={this.submit.bind(this)}
            expandable={true}
            expand={false}
            zDepth={2}
          /></SignedIn>
        <Divider style={{margin: "1em 0"}} />
        {
          threads.map(id => (
            <Thread
              key={id}
              id={id}
            />
          ))
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(GroupThreads);
