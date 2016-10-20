import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

import Webhook from 'components/Webhook'
import { AddBoxIcon, DeleteIcon } from 'components/icons'
import { openAccountWebhooksPage } from 'actions/accountPage'
import { getAccountWebhooks } from 'selectors/accountPage'
import { deleteWebhook } from 'actions/resources'

const mapStateToProps = (state) => {
  return {
    webhooks: getAccountWebhooks(state),
  }
}

const actionCreators = {
  deleteWebhook,
  openAccountWebhooksPage, push,
}

class WebhookList extends Component {
  componentDidMount() {
    this.props.openAccountWebhooksPage()
  }

  deleteWebhook(id) {
    this.props.deleteWebhook(id)
  }

  render() {
    const { webhooks, push } = this.props
    return (
      <div>
        <RaisedButton
          label="Add a New Thread Webhook"
          onClick={() => push('/account/add-webhook')}
        />
        <table>
          <tbody>
            {
              webhooks.map(id => (
                <tr key={id}>
                  <td>
                    <Webhook
                      id={id}
                    />
                  </td>
                  <td>
                    <RaisedButton
                      icon={<DeleteIcon />}
                      onClick={() => this.deleteWebhook(id)}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(WebhookList)
