import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import { Application, Account, UserList, AddUser } from './components/index'

export const Agora = (props) => <Router history={props.routerHistory}>
    <Route path="/" component={Application}>
        <Route path="account" component={Account}>
            <Route path="users" component={UserList} />
            <Route path="add-user" component={AddUser} />
        </Route>
    {/*
        <Route path="users" component={Users}>
        <Route path=":id", component={Profile} />
        </Route>
        <Route path="threads" component={Threads}>
        <Route path=":id", component={Thread} />
        </Route>
        <Route path="posts" component={Posts}>
        <Route path=":id", component={Post} />
        </Route>
        */}
    </Route>
</Router>
