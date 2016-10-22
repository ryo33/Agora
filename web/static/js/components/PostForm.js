import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

import UserSelector from './UserSelector'
import PostButton from 'components/PostButton'

const mapStateToProps = ({ account, threads }, { members, thread }) => {
  if (threads[thread] == null) {
    members = []
  } else if (threads[thread].post_limited != true) {
    members = null
  }
  return {
    currentUser: account.currentUser,
    members,
  }
}

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleForm: false,
      titleError: '',
      messageError: '',
      title: '',
      text: '',
      user: props.currentUser,
      setDefault: false,
      showPost: false
    }
    this.changeUser = this.changeUser.bind(this)
    this.toggleTitle = this.toggleTitle.bind(this)
    this.toggleDefault = this.toggleDefault.bind(this)
    this.submit = this.submit.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
  }

  changeUser(user) {
    this.setState({ user, setDefault: false })
  }

  toggleTitle(event) {
    this.setState({ titleForm: !this.state.titleForm })
  }

  toggleDefault(event) {
    this.setState({ setDefault: !this.state.setDefault })
  }

  submit() {
    const { user, title, text, setDefault } = this.state
    this.props.submit({
      defaultUser: setDefault,
      user,
      title,
      text,
    })
    this.setState({
      setDefault: false,
      title: '',
      text: '',
    })
  }

  handleChange(column, event) {
    this.setState({ [column]: event.target.value })
  }

  handleChangeText(event) {
    this.handleChange('text', event)
  }

  handleChangeTitle(event) {
    this.handleChange('title', event)
  }

  componentWillReceiveProps(props) {
    this.setState({
      user: props.currentUser,
    })
  }

  render() {
    const {
      user, setDefault,
      title, text,
      titleForm, messageError, titleError,
    } = this.state
    const {
      post, expandable, members, zDepth, user: defaultUser
    } = this.props
    const disabled = user == null || text.length == 0
    return (
      <Card
        zDepth={zDepth}
      >
        {
          expandable
            ? <CardHeader
              title="Create a New Post"
              actAsExpander
              showExpandableButton
            />
            : <CardTitle title="New Post" />
        }
        <CardText expandable={expandable}>
          {
            post
            ? <PostButton
              id={post}
            />
            : null
          }
          <Toggle
            toggled={titleForm}
            onToggle={this.toggleTitle}
            label="Title"
            labelPosition="right"
          />
          {titleForm
            ? <div><TextField
              value={title}
              onChange={this.handleChangeTitle}
              hintText="Title"
              errorText={titleError}
            /><br /></div>
              : null
          }
          <TextField
            value={text}
            onChange={this.handleChangeText}
            hintText="Post"
            floatingLabelText="Post"
            errorText={messageError}
            multiLine
            rows={3}
            fullWidth
          />
        </CardText>
        <CardActions expandable={expandable}>
          <RaisedButton
            label="Submit"
            primary
            onClick={this.submit}
            disabled={disabled}
          />
          <UserSelector
            defaultUser={defaultUser}
            user={user}
            members={members}
            changeUser={this.changeUser}
          />
          <Toggle
            toggled={setDefault}
            label="Default user"
            labelPosition="right"
            onToggle={this.toggleDefault}
            disabled={user == defaultUser}
          />
        </CardActions>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(PostForm)
