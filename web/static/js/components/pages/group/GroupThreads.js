import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import Divider from 'material-ui/Divider'

import { joinGroupChannel, leaveChannel } from '../../../socket'
import { SignedIn } from 'components/util'
import ResourceTitle from 'components/ResourceTitle'
import Group from 'components/Group'
import Thread from 'components/Thread'
import ThreadForm from 'components/ThreadForm'

const mapStateToProps = ({ groups, theme }) => {
  const group = groups.groups[groups.currentGroup]
  const currentGroup = groups.currentGroup
  let props = group
    ? {
      currentGroup: currentGroup,
      title: group.title,
      insertedAt: group.insertedAt,
      parentGroup: group.parentGroup,
      user: group.user,
      threadsMap: group.threadsMap,
      threadsList: group.threadsList,
      isFetchingGroupThreads: groups.isFetchingGroupThreads[currentGroup],
      isFetchingMissingGroupThreads: groups.isFetchingMissingGroupThreads[currentGroup]
    }
      : {}
      return Object.assign(props, { theme })
}

class GroupThreads extends Component {
  transitionTo(path) {
    return () => {
      this.props.dispatch(push(path));
    }
  }

  submit(thread) {
    thread = Object.assign({}, thread, {
      parent_group_id: this.props.params.id
    })
    console.log(thread)
    window.groupChannel.push('thread', {
      action: "add",
      params: thread
    })
  }

  render() {
    const { threadsMap, threadsList, currentGroup,
      isFetchingMissingContents,
      isFetchingGroupContents,
      theme } = this.props
      if (isFetchingGroupContents) {
        return <p>Fetching the contents</p>
      } else if (isFetchingMissingContents) {
        return <p>Fetching the missing contents</p>
      } else if (threadsList) {
        return <div>
          <Divider style={{margin: "0.15em 0"}} />
          <SignedIn><ThreadForm
              submit={this.submit.bind(this)}
              expandable={true}
              expand={false}
              zDepth={2}
            /></SignedIn>
          <Divider style={{margin: "1em 0"}} />
          {threadsList.map((id) => threadsMap.hasOwnProperty(id)
            ? <Thread
              key={id}
              id={id}
              title={threadsMap[id].title}
              user={threadsMap[id].user}
              insertedAt={threadsMap[id].inserted_at}
            />
            : null)}
          </div>
      } else {
        return null
      }
  }
}

export default connect(mapStateToProps)(GroupThreads)
