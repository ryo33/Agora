import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {Tabs, Tab} from 'material-ui/Tabs';

import { joinGroupChannel, leaveChannel } from '../../../socket'

import GroupComponent from 'components/Group'
import { updateCurrentGroup,
  fetchGroupInfo,
  fetchGroupThreads,
  receiveGroupThreads,
  fetchMembers,
  receiveMembers } from 'actions/groups'

  const mapStateToProps = ({ groups, theme }) => {
    const group = groups.groups[groups.currentGroup]
    const currentGroup = groups.currentGroup
    let props = group
      ? {
        tab: groups.tab,
        currentGroup: currentGroup,
        name: group.name,
        insertedAt: group.insertedAt,
        parentGroup: group.parentGroup,
        user: group.user,
        postsMap: group.postsMap,
        postsList: group.postsList,
        isFetchingGroupThreads: groups.isFetchingGroupThreads[currentGroup],
        isFetchingMissingGroupThreads: groups.isFetchingMissingGroupThreads[currentGroup]
      }
        : {}
        return Object.assign(props, { theme })
  }

  class Group extends Component {
    componentDidMount() {
      const id = this.props.params.id
      const dispatch = this.props.dispatch
      joinGroupChannel(this.props.dispatch, id)
      .receive('ok', () => {
        dispatch(updateCurrentGroup(id))
        dispatch(fetchGroupInfo(id))
        dispatch(fetchGroupThreads(id))
        dispatch(fetchMembers(id))
      })
      window.groupChannel.on('add_threads', ({ id, threads_map, threads_list }) => {
        dispatch(receiveGroupThreads(id, threads_map, threads_list))
      })
      window.groupChannel.on('add_members', ({ id, members_map, members_list }) => {
        dispatch(receiveMembers(id, members_map, members_list))
      })
    }

    componentWillUnmount() {
      if (window.groupChannel) {
        leaveChannel(window.groupChannel)
      }
    }

    handleChange(value) {
      this.props.dispatch(push('/groups/' + this.props.params.id + '/' + value))
    }

    render() {
      return <div>
        { this.props.user
          ? <GroupComponent
            id={this.props.params.id}
            user={this.props.user}
            name={this.props.name}
            insertedAt={this.props.insertedAt}
          />
          : null
        }
        <Tabs
          value={this.props.tab}
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
        {cloneElement(this.props.children, {
          groupID: this.props.params.id
        })}
      </div>
    }
  }

  export default connect(mapStateToProps)(Group)
