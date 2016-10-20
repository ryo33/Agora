import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose } from 'recompose'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import ThreadHeader from 'components/ThreadHeader'
import User from 'components/User'
import UserForm from 'components/UserForm'
import { openThreadWebhooksPage } from 'actions/threadPage'
import { submitWebhookLink, deleteWebhookLink } from 'actions/resources'
import { requestThreadWebhookSuggestions } from 'actions/userForm'
import { DeleteIcon } from 'components/icons'
import { checkThreadOwned } from 'hocs/resources'
import { getAccountUserIDs } from 'selectors/accountPage'

const mapStateToProps = (state, { params }) => {
  const { threadPage } = state
  const id = parseInt(params.id, 10)
  return {
    id,
    webhooks: threadPage.webhooks,
  }
}

const actionCreators = {
  openThreadWebhooksPage, submitWebhookLink,
  requestThreadWebhookSuggestions,
  deleteWebhookLink,
}

class ThreadWebhooks extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.requestUserSuggestions = this.requestUserSuggestions.bind(this)
    this.uniqueKey = `thread@@${props.id}`
    this.state = {
      user: null,
      dialog: false,
    }
  }

  deleteLink(userID) {
    const { deleteWebhookLink, id } = this.props
    deleteWebhookLink(id, userID)
  }

  requestUserSuggestions(value) {
    const { id, requestThreadWebhookSuggestions } = this.props
    requestThreadWebhookSuggestions(this.uniqueKey, value, id)
  }

  open() { this.setState({ dialog: true }) }
  close() { this.setState({ dialog: false }) }

  componentDidMount() {
    const { openThreadWebhooksPage, id } = this.props
    openThreadWebhooksPage(id)
  }

  submit(params) {
    this.close()
    const { submitWebhookLink, id } = this.props
    const { user: webhook, selector: user } = params
    submitWebhookLink({ thread: id, webhook, user })
  }

  render() {
    const { id, webhooks, isOwned } = this.props
    return (
      <div>
        <ThreadHeader id={id} />
        {
          isOwned
          ? <RaisedButton
            label="Add a Webhook"
            onClick={this.open}
          />
          : null
        }
        <table>
          <tbody>
            {
              webhooks.map(id => (
                <tr key={id}>
                  <td><User id={id} /></td>
                  <td>
                    {
                      isOwned
                      ? <RaisedButton
                        icon={<DeleteIcon />}
                        onClick={() => this.deleteLink(id)}
                      />
                      : null
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Dialog
          open={this.state.dialog}
          onRequestClose={this.close}
          bodyStyle={{ padding: 0 }}
        >
          <UserForm
            onChange={this.requestUserSuggestions}
            uniqueKey={this.uniqueKey}
            title="Add a Webhook"
            submit={this.submit}
            expandable
            expand={false}
            zDepth={2}
          />
        </Dialog>
      </div>
    )
  }
}

export default compose(connect(mapStateToProps, actionCreators), checkThreadOwned)(ThreadWebhooks)
