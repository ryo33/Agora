import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Group from 'components/Group'

class AccountGroups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: []
        }
    }

    componentDidMount() {
        window.accountChannel
        .push("group", {
            action: 'get_by_account',
            params: null
        })
        .receive("ok", ({ groups }) => this.setState({ groups }))
    }

    transitionTo(path) {
        return () => {
            this.props.dispatch(push(path));
        }
    }

    render() {
        return <div>
            {this.state.groups.map(({id, name, user, inserted_at}, key) => <Group
                key={key}
                id={id}
                name={name}
                user={user}
                insertedAt={inserted_at}
            />)}
        </div>
    }
}

export default connect()(AccountGroups)
