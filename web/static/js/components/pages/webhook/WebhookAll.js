import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ResourceList from 'components/ResourceList'

import { openAllWebhooksPage } from 'actions/webhookPage'

const mapStateToProps = ({ webhookPage }) => {
  return {
    webhooks: webhookPage.webhooks,
  }
}

const actionCreators = {
  openAllWebhooksPage,
}

class WebhookAll extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { openAllWebhooksPage } = this.props
    openAllWebhooksPage()
  }

  render() {
    const { webhooks } = this.props
    return (
      <div>
        {
          webhooks.map(id => (
            <Webhook id={id} />
          ))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(WebhookAll)
