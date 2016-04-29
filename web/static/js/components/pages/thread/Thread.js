import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'

import { joinThreadChannel, leaveChannel } from '../../../socket'

const mapStateToProps = ({ threads }) => {
    return {
        posts: threads.posts
    }
}

class Thread extends Component {
    componentDitMount() {
        joinThreadChannel(this.props.dispatch, this.props.params.id)
    }

    componentWillUnmount() {
        leaveChannel(window.threadChannel)
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
        let posts = this.props.posts.map(({ name, text }) => <Card>
            <CardTitle title="name" />
            <CardText>
                text
            </CardText>
        </Card>)
        return <div>
            {posts}
        </div>
    }
}

export default connect(mapStateToProps)(Thread)
