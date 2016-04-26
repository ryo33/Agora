import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Avatar from 'material-ui/lib/avatar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import Paper from 'material-ui/lib/paper'
import FontIcon from 'material-ui/lib/font-icon'


const mapStateToProps = (state) => {
    return { router: state.history }
}
class UserList extends Component {
    transitionTo(path) {
        return (event) => {
            this.props.dispatch(push(path));
        }
    }
    render() {
        return <div>
            <List subheader="Users">
                <ListItem
                    id="YJSNPI"
                    primaryText="YJSNPI"
                    leftAvatar={<Avatar src="/images/phoenix.png" />}
                    onClick={this.transitionTo('/account/users/' + 'YJSNPI')}
                />
                <ListItem
                    id="HKKN"
                    primaryText="HKKN"
                    leftAvatar={<Avatar src="/images/phoenix.png" />}
                    onClick={this.transitionTo('/account/users/' + 'HKKN')}
                />
                <ListItem
                    id="KWGE"
                    primaryText="KWGE"
                    leftAvatar={<Avatar src="/images/phoenix.png" />}
                    onClick={this.transitionTo('/account/users/' + 'KWGE')}
                />
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
