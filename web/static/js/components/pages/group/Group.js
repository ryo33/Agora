import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Tabs, Tab } from 'material-ui/Tabs';

import { joinGroupChannel, leaveChannel } from '../../../socket';

import GroupHeader from 'components/GroupHeader';

import {
  openGroupPage, closeGroupPage
} from 'actions/groupPage';


const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    id: parseInt(params.id, 10),
    tab: groupPage.tab
  };
};

const actionCreators = {
  openGroupPage, closeGroupPage, push
};

class Group extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { openGroupPage, id } = this.props;
    openGroupPage(this.props.id);
  }

  componentWillUnmount() {
    const { closeGroupPage, id } = this.props;
    closeGroupPage(this.props.id);
  }

  handleChange(value) {
    this.props.push('/groups/' + this.props.id + '/' + value);
  }

  render() {
    const { id, tab } = this.props;
    return <div>
      <div id='group-header'>
        <GroupHeader id={id} />
      </div>
      <div>
        <Tabs
          value={tab}
          onChange={this.handleChange.bind(this)}
        >
          <Tab
            label="Threads"
            value="threads"
          >
          </Tab>
          <Tab
            label="Groups"
            value="groups"
          >
          </Tab>
          <Tab
            label="Members"
            value="members"
          >
          </Tab>
        </Tabs>
      </div>
      <div>
        {this.props.children}
      </div>
    </div>
  }
}

export default connect(mapStateToProps, actionCreators)(Group);
