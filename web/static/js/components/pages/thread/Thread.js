import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'

import { joinThreadChannel, leaveChannel } from '../../../socket'
import PostForm from 'components/PostForm'
import { SignedIn } from 'components/util'
import Post from 'components/Post'

const mapStateToProps = ({ threads }) => {
    return {
        posts: threads.posts
    }
}

class Thread extends Component {
    componentDidMount() {
        joinThreadChannel(this.props.dispatch, this.props.params.id)
    }

    componentWillUnmount() {
        if (window.threadChannel) {
            leaveChannel(window.threadChannel)
        }
    }

    transitionTo(path) {
        return () => {
            this.props.dispatch(push(path));
        }
    }

    post(post) {
        post = Object.assign({}, post, {
            thread_id: this.props.params.id
        })
        window.threadChannel.push('post', {
            action: "add",
            params: post,
        })
    }

    render() {
        let posts = this.props.posts.map(({ id, title, text, user }, key) => <Post
            key={key}
            id={id}
            title={title}
            text={text}
            user={user}
        />)
        return <div>
            <SignedIn><PostForm
                submit={this.post.bind(this)}
                expandable={true}
                expand={false}
            /></SignedIn>
            <Divider />
            {posts}
        </div>
    }
}

export default connect(mapStateToProps)(Thread)
