import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { CSSGrid, layout, measureItems, makeResponsive } from 'react-stonecutter';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Thread from 'components/Thread';
import Group from 'components/Group';
import Watchlist from 'components/Watchlist';
import GroupForm from 'components/GroupForm';
import ThreadForm from 'components/ThreadForm';
import WatchlistForm from 'components/WatchlistForm';

import { grey800, grey700 } from 'material-ui/styles/colors';
import { Card, CardTitle } from 'material-ui/Card';
import { AddBoxIcon } from 'components/icons/index'

import { submitGroup, submitThread, submitWatchlist } from 'actions/resources';


const mapStateToProps =({ theme }, { mode, groups, threads, watchlists, formParams }) => ({
  mode, theme, groups, threads, watchlists, formParams
})

const actionCreators = {
  submitGroup,
  submitThread,
  submitWatchlist
};

class ResourceList extends Component {
  constructor() {
    super()
    this.onChildNodeDidMount = this.onChildNodeDidMount.bind(this);
    this.submitGroup = this.submitGroup.bind(this);
    this.submitThread = this.submitThread.bind(this);
    this.submitWatchlist = this.submitWatchlist.bind(this);
    this.openAddGroup  = this.openAddGroup.bind(this);
    this.closeAddGroup = this.closeAddGroup.bind(this);
    this.openAddThread  = this.openAddThread.bind(this);
    this.closeAddThread = this.closeAddThread.bind(this);
    this.openAddWatchlist  = this.openAddWatchlist.bind(this);
    this.closeAddWatchlist = this.closeAddWatchlist.bind(this);
    this.state = {
      Grid: this.createGrid(),
      remeasured: false,
      loadedCount: 1,
      addGroup: false,
      addThread: false,
      addWatchlist: false
    };
  }

  submitGroup(params) {
    const { submitGroup } = this.props;
    submitGroup(params);
  }

  submitThread(params) {
    const { submitThread } = this.props;
    submitThread(params);
  }

  submitWatchlist(params) {
    const { submitWatchlist } = this.props;
    submitWatchlist(params);
  }

  openAddGroup() { this.setState({addGroup: true}); }
  closeAddGroup() { this.setState({addGroup: false}); }
  openAddThread() { this.setState({addThread: true}); }
  closeAddThread() { this.setState({addThread: false}); }
  openAddWatchlist() { this.setState({addWatchlist: true}); }
    closeAddWatchlist() { this.setState({addWatchlist: false}); }


    createGrid() {
      let Grid;
      Grid = makeResponsive(measureItems(CSSGrid), {
        maxWidth: 1980,
      minPadding: 8,
    });
    return Grid;
    }

    onChildNodeDidMount () {
      let all = this.props.groups.length
        + this.props.threads.length
        + this.props.watchlists.length;
      this.setState({loadedCount: this.state.loadedCount + 1});
      if(!this.state.remeasured && all <= this.state.loadedCount) {
        let Grid = measureItems(this.state.Grid)
        this.setState({Grid: Grid, remeasured: true});
      }
    }

    getTitle(message) {
      return (
        <div>
          <p className='center'><AddBoxIcon
            style={this.props.theme.form.box.icon}
            color={grey700}/>
          </p>
          <p className='center'>{message}</p>
        </div>
      );
    }

    transitionTo(path) {
      return () => {
        this.props.dispatch(push(path));
      };
      }

    render() {
      const {
        mode,
        theme,
        groups,
      threads,
      watchlists,
      formParams,
    } = this.props;
    const { Grid } = this.state
    return (
      <div>
        <Grid
          className='resource-list'
          columnWidth={100}
          gutterWidth={4}
          gutterHeight={4}
          layout={layout.pinterest}
          duration={400}
          easing="ease-out"
        >
          {
            mode == 'thread'?
            <Card
              style={theme.form.box.root}
              containerStyle={{padding: 0}}
              onClick={this.openAddThread}
            >
              <CardTitle
                title={this.getTitle("Add Thread")}
                titleStyle={theme.form.box.text}
                titleColor={grey800}
                style={theme.form.box.title}
              />
            </Card> : null
          }
          {
            threads.map(id => <div key={id}><Thread
              key={id}
              id={id}
              onRender={this.onChildNodeDidMount}
            /></div>)
          }
          {
            mode == 'group'?
            <Card
              style={theme.resource.root}
              containerStyle={{padding: 0}}
              onClick={this.openAddGroup}
            >
              <CardTitle
                title={this.getTitle("Add Group")}
                titleStyle={theme.form.box.text}
                titleColor={grey800}
                style={theme.form.box.title}
              />
            </Card> : null
          }
          {
            groups.map(id => <div key={id}><Group
              key={id}
              id={id}
              onRender={this.onChildNodeDidMount}
            /></div>)
          }
          {
            mode == 'watchlist'?
            <Card
              style={theme.resource.root}
              containerStyle={{padding: 0}}
              onClick={this.openAddWatchlist}
            >
              <CardTitle
                title={this.getTitle("Add Watchlist")}
                titleStyle={theme.form.box.text}
                titleColor={grey800}
                style={theme.form.box.title}
              />
            </Card> : null
          }
          {
            watchlists.map(id => <div key={id}><Watchlist
              key={id}
              id={id}
              onRender={this.onChildNodeDidMount}
            /></div>)
          }
        </Grid>
        <GroupForm
          open={this.state.addGroup}
          close={this.closeAddGroup}
          submit={formParams.submit || this.submitGroup}
          group={formParams.group}
          members={formParams.members}
          zDepth={formParams.zDepth}
          groupID={formParams.groupID}
        />
        <ThreadForm
          open={this.state.addThread}
          close={this.closeAddThread}
          submit={formParams.submit || this.submitThread}
          group={formParams.group}
          members={formParams.members}
          zDepth={formParams.zDepth}
        />
        <WatchlistForm
          open={this.state.addWatchlist}
          close={this.closeAddWatchlist}
          submit={this.submitWatchlist}
        />
      </div>
    );
  }
}

ResourceList.defaultProps = {
  mode: 'default', formParams: {}, groups: [], threads: [], watchlists: []
};

export default connect(mapStateToProps, actionCreators)(ResourceList);
