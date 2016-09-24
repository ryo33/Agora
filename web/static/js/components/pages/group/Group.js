import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Tabs, Tab } from 'material-ui/Tabs';

import { joinGroupChannel, leaveChannel } from '../../../socket';

import GroupHeader from 'components/pages/group/GroupHeader';

import {
  openGroupPage, closeGroupPage
} from 'actions/groupPage';


const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    id: params.id,
    tab: groupPage.tab
  };
};

const actionCreators = {
  openGroupPage, closeGroupPage, push
};

class Group extends Component {
  constructor() {
    super()
    this.onScroll = this.onScroll.bind(this)
    this.state = {
      tabsID: 'group-tabs',
      contentsID: 'group-contents'
    }
  }

  componentDidMount() {
    const { openGroupPage, id } = this.props;
    openGroupPage(this.props.id);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    const { closeGroupPage, id } = this.props;
    window.removeEventListener('scroll', this.onScroll, false);
    closeGroupPage(this.props.id);
  }

  handleChange(value) {
    this.props.push('/groups/' + this.props.id + '/' + value);
  }

  onScroll() {
    const group_header_height = 130
    const y = document.documentElement.scrollTop || document.body.scrollTop;
    if(y > group_header_height) {
      this.setState({ tabsID: 'group-tabs-fixed', contentsID: 'group-contents-tabs-fixed'})
    }
    else {
      this.setState({ tabsID: 'group-tabs', contentsID: 'group-contents'})
    }
  }

  render() {
    const { id, tab } = this.props;
    return <div>
      <div id='group-header'>
        <GroupHeader id={id} />
      </div>
      <div id={this.state.tabsID}>
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
      <div id={this.state.contentsID}>
        {cloneElement(this.props.children, {
          groupID: id
        })}
      </div>
    </div>
  }
}

export default connect(mapStateToProps, actionCreators)(Group);
