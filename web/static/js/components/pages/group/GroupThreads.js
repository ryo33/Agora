import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import { SignedIn } from 'components/util';
import ResourceList from 'components/ResourceList';
import ThreadForm from 'components/ThreadForm';

import { openGroupThreadsTab } from 'actions/groupPage';
import { submitThread } from 'actions/resources';

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    threads: groupPage.groupThreads,
    id: params.id
  };
};

const actionCreators = {
  openGroupThreadsTab, submitThread
};

class GroupThreads extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { openGroupThreadsTab, id } = this.props;
    openGroupThreadsTab(id);
  }

  submit({ user, title }) {
    const { id, submitThread } = this.props;
    submitThread({group: id, user, title});
  }

  render() {
    const { threads, theme } = this.props;
    return (
      <div>
        <Divider style={{margin: "0.15em 0"}} />
        <SignedIn><ThreadForm
            submit={this.submit}
            expandable={true}
            expand={false}
            zDepth={2}
          /></SignedIn>
        <Divider style={{margin: "1em 0"}} />
        <ResourceList threads={threads} />
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(GroupThreads);
