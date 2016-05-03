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

import { updateCurrentThread,
    fetchThreadContents,
    receivePosts } from 'actions/threads'


const mapStateToProps = ({ threads }) => {
    const thread = threads.threads[threads.currentThread]
    const currentThread = threads.currentThread
    return thread
        ? {
            currentThread: currentThread,
            title: thread.title,
            parentGroup: thread.parentGroup,
            user: thread.user,
            postsMap: thread.postsMap,
            postsList: thread.postsList,
            isFetchingThreadContents: threads.isFetchingThreadContents[currentThread],
            isFetchingMissingPosts: threads.isFetchingMissingPosts[currentThread]
        }
        : {}
}

class Thread extends Component {
    componentDidMount() {
        const id = this.props.params.id
        const dispatch = this.props.dispatch
        dispatch(updateCurrentThread(id))
        joinThreadChannel(this.props.dispatch, id)
        window.threadChannel.on('add_posts', ({ id, posts_map, posts_list }) => {
            dispatch(receivePosts(id, posts_map, posts_list))
        })
        dispatch(fetchThreadContents(id))
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
        const { postsMap, postsList, currentThread,
            isFetchingMissingPosts,
            isFetchingThreadContents } = this.props
        if (isFetchingThreadContents) {
            return <p>Fetching the contents</p>
        } else if (isFetchingMissingPosts) {
            return <p>Fetching the missing contents</p>
        } else if (postsList) {
            return <div>
                <Card zDepth={2}>
                    <CardHeader
                        title={<ResourceTitle
                            user={this.props.user}
                            title={this.props.title}
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
                {postsList.map((id, key) => postsMap.hasOwnProperty(id)
                    ? <Post
                        key={key}
                        id={id}
                        title={postsMap[id].title}
                        text={postsMap[id].text}
                        user={postsMap[id].user}
                        style={{margin: "0.15em 0"}}
                    />
                    : null)}
            </div>
        } else {
            return null
        }
    }
}

export default connect(mapStateToProps)(Thread)
