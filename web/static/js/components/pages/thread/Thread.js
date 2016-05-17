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
import ThreadComponent from 'components/Thread'


const mapStateToProps = ({ threads, theme }) => {
    const thread = threads.threads[threads.currentThread]
    const currentThread = threads.currentThread
    let props = thread
        ? {
            currentThread: currentThread,
            title: thread.title,
            insertedAt: thread.insertedAt,
            parentGroup: thread.parentGroup,
            user: thread.user,
            postsMap: thread.postsMap,
            postsList: thread.postsList,
            isFetchingThreadContents: threads.isFetchingThreadContents[currentThread],
            isFetchingMissingPosts: threads.isFetchingMissingPosts[currentThread]
        }
        : {}
    return Object.assign(props, { theme })
}

class Thread extends Component {
    componentDidMount() {
        const id = this.props.params.id
        const dispatch = this.props.dispatch
        dispatch(updateCurrentThread(id))
        joinThreadChannel(this.props.dispatch, id).receive(
            "ok", ({ actions }) => {
                dispatch(fetchThreadContents(id))
            }
        )
        window.threadChannel.on('add_posts', ({ id, posts_map, posts_list }) => {
            dispatch(receivePosts(id, posts_map, posts_list))
        })
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
            isFetchingThreadContents,
            theme } = this.props
        if (isFetchingThreadContents) {
            return <p>Fetching the contents</p>
        } else if (isFetchingMissingPosts) {
            return <p>Fetching the missing contents</p>
        } else if (postsList) {
            return <div>
                <ThreadComponent
                    id={this.props.params.id}
                    user={this.props.user}
                    title={this.props.title}
                    insertedAt={this.props.insertedAt}
                />
                <Divider style={{margin: "0.15em 0"}} />
                <SignedIn><PostForm
                        submit={this.post.bind(this)}
                        expandable={true}
                        expand={false}
                        zDepth={2}
                    /></SignedIn>
                <Divider style={{margin: "1em 0"}} />
                {postsList.map((id) => postsMap.hasOwnProperty(id)
                    ? <Post
                        key={id}
                        id={id}
                        title={postsMap[id].title}
                        text={postsMap[id].text}
                        user={postsMap[id].user}
                        insertedAt={postsMap[id].inserted_at}
                    />
                    : null)}
            </div>
        } else {
            return null
        }
    }
}

export default connect(mapStateToProps)(Thread)
