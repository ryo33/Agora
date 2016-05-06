import React, { Component } from 'react'

import Moment from 'moment'

class Time extends Component {
    constructor(props) {
        super(props)
        this.state = {
            intervalID: null,
            date: ""
        }
    }
    componentDidMount() {
        this.format()
        let intervalID = setInterval(this.format.bind(this), 5000)
        this.setState({intervalID: intervalID})
    }
    componentWillUnmount() {
        if (this.state.intervalID != null) clearInterval(this.state.intervalID);
        this.setState({intervalID: null})
    }
    format() {
        let insertedAt = Moment.parseZone(this.props.time).local()
        let now = Moment()
        let date = ""
        if (now.diff(insertedAt, 'year') > 0) {
            date = insertedAt.format("MMM D YYYY H:mm:ss")
        } else if (now.diff(insertedAt, 'days') > 0) {
            date = insertedAt.format("MMM D H:mm:ss")
        } else {
            date = insertedAt.fromNow()
        }
        this.setState({date: date})
    }
    render() {
        return <span>
            {this.state.date}
        </span>
    }
}

export default Time
