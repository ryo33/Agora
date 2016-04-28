import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Avatar from 'material-ui/lib/avatar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import Paper from 'material-ui/lib/paper'
import FontIcon from 'material-ui/lib/font-icon'

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
            this.props.dispatch({
                type: 'SET_CURRENT_USER',
                id: id
            })
        }
    }

    render() {
        let users = this.props.users.map(({ uid, name, id }, key) => <ListItem
            key={key}
            secondaryText={uid}
            primaryText={name}
            leftAvatar={<Avatar src="/images/phoenix.png" />}
            onClick={this.setCurrentUser(id)}
        />)
        return <div>
            <List subheader="Users">
                {users}
                <Divider />
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
