import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SvgIcon from 'material-ui/SvgIcon'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const mapStateToProps = ({ account }) => {
    return {
        users: account.users,
        currentUser: account.currentUser
    }
}

class UserSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beforeCurrentUser: props.currentUser
        }
    }

    componentWillReceiveProps(props) {
        if (props.currentUser != this.state.beforeCurrentUser) {
            this.props.changeUser(props.currentUser)
            this.setState(Object.assign({}, this.state, {
                user: user
            }))
        }
    }

    handleChange(event, index, value) {
        this.props.changeUser(value)
    }

    render() {
        return <SelectField
            value={this.props.user}
            onChange={this.handleChange.bind(this)}
        >
            {this.props.users.map(({ uid, name, id }, key) => <MenuItem
                key={key}
                value={id}
                secondaryText={uid}
                primaryText={name}
            />)}
        </SelectField>
    }
}

export default connect(mapStateToProps)(UserSelector)
