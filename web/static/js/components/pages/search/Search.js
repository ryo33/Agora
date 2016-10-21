import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'

import { SearchIcon } from 'components/icons'
import { Group, Thread, Post, User } from 'components/listItems'
import {
  updateQuery
} from 'actions/searchPage'

const mapStateToProps = ({ searchPage }) => {
  return {
    ...searchPage
  }
}

const actionCreaters = {
  updateQuery
}

class Search extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      query: '',
    }
  }

  handleChange(event) {
    const query = event.target.value
    this.setState({ query })
    this.props.updateQuery(query)
  }

  renderItem(item) {
    const { type, id } = item
    switch (type) {
      case 'group':
        return <Group key={'g'+id} id={id} />
      case 'thread':
        return <Thread key={'t'+id} id={id} />
      case 'post':
        return <Post key={'p'+id} id={id} />
      case 'user':
        return <User key={'u'+id} id={id} />
    }
  }

  render() {
    const {
      items, query
    } = this.props
    return (
      <div>
        <SearchIcon />
        <TextField
          hintText="Hint Text"
          floatingLabelText="Search Query"
          value={this.state.query}
          onChange={this.handleChange}
        /><br />
        <Divider style={{ margin: '1em 0' }} />
        {
          items.map(item => this.renderItem(item))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreaters)(Search)
