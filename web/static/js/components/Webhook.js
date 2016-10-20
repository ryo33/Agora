import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import {
  Card, CardHeader, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import Unimplemented from 'components/Unimplemented'
import ResourceTitle from 'components/ResourceTitle'

import { requireWebhook } from 'hocs/resources'

const mapStateToProps = ({ theme }, { id }) => {
  return {
    theme,
  }
}

const actionCreators = {
  push,
}

class Webhook extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { id, push } = this.props
    push(`/thread-webhooks/${id}`)
  }

  render() {
    const { id, webhook, theme } = this.props
    return (
      <Card
        style={theme.user.root}
      >
        <CardHeader
          style={theme.user.header}
          title={<ResourceTitle
            onClick={this.handleClick}
            user={webhook.user_id}
            title={webhook.url}
            path={`/thread-webhooks/${webhook.id}`}
            insertedAt={webhook.inserted_at}
          />}
        />
      </Card>
    )
  }
}

export default requireWebhook(mapStateToProps, actionCreators)(Webhook)
