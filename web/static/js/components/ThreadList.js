import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'

class ThreadList extends Component {
    transitionTo(path) {
        return () => {
            this.props.dispatch(push(path));
        }
    }

    render() {
        return <div>
            <List>
                {
                    this.props.threads.map(({ title, id }, key) => <ListItem
                        key={key}
                        primaryText={title}
                        onClick={this.transitionTo('/threads/' + id)}
                    />)
                }
            </List>
        </div>
    }
}

export default connect()(ThreadList)
