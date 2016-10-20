import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import {
  openWebhookPage,
  closeWebhookPage,
} from 'actions/webhookPage'
import { editWebhook } from 'actions/resources'
import WebhookForm from 'components/WebhookForm'
import { SignedIn } from 'components/util'
import WebhookComponent from 'components/Webhook'
import { checkWebhookOwned } from 'hocs/resources'

const mapStateToProps = ({ webhooks }, { params }) => {
  const id = parseInt(params.id, 10)
  const webhook = webhooks[id] || null
  return {
    id, webhook,
  }
}

const actionCreaters = {
  editWebhook, openWebhookPage, closeWebhookPage,
}

class Webhook extends Component {
  constructor(props, context) {
    super(props, context)
    this.submit = this.submit.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.state = {
      dialog: false,
    }
  }

  open() { this.setState({ dialog: true }) }
  close() { this.setState({ dialog: false }) }

  componentDidMount() {
    const { openWebhookPage, id } = this.props
    openWebhookPage(id)
  }

  componentWillUnmount() {
    const { closeWebhookPage, id } = this.props
    closeWebhookPage(id)
  }

  submit(params) {
    const { editWebhook, id } = this.props
    this.close()
    editWebhook(id, Object.assign(params, { webhook: id }))
  }

  render() {
    const {
      webhook, id, theme, isOwned,
    } = this.props
    return (
      <div>
        {
          isOwned
          ? <div>
            <WebhookComponent id={id} />
            <Divider style={{ margin: '1em 0' }} />
            <RaisedButton
              label="Edit"
              onClick={this.open}
            />
            <Dialog
              open={this.state.dialog}
              onRequestClose={this.close}
              bodyStyle={{ padding: 0 }}
            >
              {
                webhook
                ? <WebhookForm
                  editMode
                  close={this.close}
                  submit={this.submit}
                  {...webhook}
                />
                : null
              }
            </Dialog>
          </div>
          : null
        }
      </div>
    )
  }
}

export default compose(connect(mapStateToProps, actionCreaters), checkWebhookOwned)(Webhook)
