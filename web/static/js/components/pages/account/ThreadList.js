import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

const mapStateToProps = ({ account }) => {
    return {
        threads: account.threads,
        currentThread: account.currentThread
    }
}

class ThreadList extends Component {
    componentDidMount() {
        window.accountChannel
        .push("thread", {
            action: 'get_by_account',
            params: null
        })
    }

    transitionTo(path) {
        return () => {
            this.props.dispatch(push(path));
        }
    }

    render() {
        let threads = this.props.threads.map(({ title, id }, key) => <ListItem
            key={key}
            primaryText={title}
            onClick={this.transitionTo('/threads/' + id)}
        />)
        return <div>
            <List>
                {threads}
            </List>
        </div>
    }
}

export default connect(mapStateToProps)(ThreadList)
