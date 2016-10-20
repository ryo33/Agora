import { expect } from 'chai'

import { fork, take, put, select, call, race } from 'redux-saga/effects'

global.window = { token: 'dummy' }

import resourceSaga from './resources.js'

import {
  addGroups, prepareGroups,
} from 'actions/resources'

describe('resourceSaga', () => {
  it('should fetch resources', () => {
    const saga = resourceSaga()
    let ret

    ret = saga.next()
    console.log(ret)
  })
})
