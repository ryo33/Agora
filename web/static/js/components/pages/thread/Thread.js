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
import ResourceTitle from 'components/ResourceTitle'

const mapStateToProps = ({ threads }) => {
    return {
        info: threads.info,
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
            style={{margin: "0.15em 0"}}
        />)
        return <div>
            <Card zDepth={2}>
                <CardHeader
                    title={<ResourceTitle
                        user={this.props.info.user}
                        title={this.props.info.title}
                    />}
                />
            </Card>
            <Divider style={{margin: "0.15em 0"}} />
            <SignedIn><PostForm
                submit={this.post.bind(this)}
                expandable={true}
                expand={false}
                zDepth={2}
            /></SignedIn>
            <Divider style={{margin: "1em 0"}} />
            {posts}
        </div>
    }
}

export default connect(mapStateToProps)(Thread)
