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
        users: account.users,
        currentUser: account.currentUser
    }
}

class UserList extends Component {
    componentDidMount() {
    }

    transitionTo(path) {
        return (event) => {
            this.props.dispatch(push(path));
        }
    }

    setCurrentUser(id) {
        return () => {
            window.accountChannel.push('set_current_user', id)
        }
    }

    render() {
        let users = [];
        let currentUser = <ListItem
            primaryText="No Current User"
            disabled={true}
        />
        if (this.props.users) {
            this.props.users.forEach(({ uid, name, id }, key) => {
                let item = <ListItem
                    key={key}
                    secondaryText={uid}
                    primaryText={name}
                    leftAvatar={<Avatar src="/images/phoenix.png" />}
                    onClick={this.setCurrentUser(id)}
                />
                if (id == this.props.currentUser) {
                    currentUser = item
                } else {
                    users.push(<ListItem
                        key={key}
                        secondaryText={uid}
                        primaryText={name}
                        leftAvatar={<Avatar src="/images/phoenix.png" />}
                        onClick={this.setCurrentUser(id)}
                    />)
                }
            })
        }
        return <div>
            <List>
                <Subheader>Current User</Subheader>
                {currentUser}
            </List>
            <Divider />
            <List>
                <Subheader>Users</Subheader>
                {users}
            </List>
            <Divider />
            <List>
                <ListItem primaryText="Add New User"
                    leftIcon={<FontIcon
                        children="add_box"
                        className="material-icons"
                    />}
                    onClick={this.transitionTo('/account/add-user')}
                />
            </List>
        </div>
    }
}

export default connect(mapStateToProps)(UserList)
