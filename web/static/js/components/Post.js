import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { compose } from 'recompose'

import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Linkify from 'react-linkify'
import ReactTooltip from 'react-tooltip'
import { grey400, grey200 } from 'material-ui/styles/colors'

import { MembershipIcon } from 'components/icons'
import Unimplemented from 'components/Unimplemented'
import ResourceTitle from 'components/ResourceTitle'
import PostActions from 'components/PostActions'
import ListItem from 'components/ListItem'
import PostButton from 'components/PostButton'

import { requirePost, checkPostOwned } from 'hocs/resources'

const actionCreators = {
  push,
}


class Post extends Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
    this.state = {
      open: false,
    }
  }

  click() {
    this.setState({ open: !this.state.open })
  }

  renderMembership(id) {
    const tooltipID = 'post_membership_' + id
    return (
      <span>
        <span>
          <MembershipIcon
            data-tip data-for={tooltipID}
            style={{
              fontSize: '1em'
            }}
          />
        </span>
        <ReactTooltip id={tooltipID} type='dark' effect='solid'>Member</ReactTooltip>
      </span>
    )
  }

  render() {
    const { isOwned, id, post, push, members } = this.props
    const { open } = this.state
    const isMember = members ? members.includes(post.user_id) : false
    const title_color = isOwned ? grey400 : grey200
    return (
      <Paper
        onClick={this.click}
        style={{margin: "0.5%", borderRadius: '2.5px'}}
      >
        <div style={{backgroundColor: title_color, padding: '0.1em 0.5em'}}>
          <ResourceTitle
            user={post.user_id}
            title={post.title}
            path={`/posts/${id}`}
            insertedAt={post.inserted_at}
          />
          {
            isMember
              ? this.renderMembership(id)
              : null
          }
        </div>
        {
          post.post_id
            ? <div><PostButton id={post.post_id} /></div>
            : null
        }
        <pre
          style={{
            fontSize: '1.0em',
            whiteSpace: 'pre-wrap',
            margin: '0px',
            padding: '8px 8px',
          }}
        >
          <Linkify properties={{ target: '_blank' }}>
            {post.text}
          </Linkify>
        </pre>
        {
          open
          ? <PostActions id={id} />
          : null
        }
      </Paper>
    )
  }
}

export default compose(requirePost(null, actionCreators), checkPostOwned)(Post)
