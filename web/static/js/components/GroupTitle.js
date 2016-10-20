import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requireGroup } from 'hocs/resources'

const GroupTitle = ({ group }) => <span>{group.name}</span>

export default requireGroup()(GroupTitle)
