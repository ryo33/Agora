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
        users: account.users
    }
}

class UserSelector extends Component {
    constructor(props) {
        super(props)
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
