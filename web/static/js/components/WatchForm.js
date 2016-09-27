import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import { getAccountWatchlists } from 'selectors/accountPage';
import { AddBoxIcon } from 'components/icons/index';

const mapStateToProps = (state) => {
  return {
    watchlists: getAccountWatchlists(state).map(id => [id, state.watchlists[id]])
  };
};

const actionCreators = {
  push
};

class WatchForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { push } = this.props;
    push('account/add-watchlist');
  }

  render() {
    const { watchlists, select, isWatched } = this.props;
    return (
      <Paper>
      <List>
        <Subheader>Select a target watchlist</Subheader>
        <ListItem
          primaryText="Create a new watchlist"
          leftIcon={<AddBoxIcon />}
          onClick={this.handleClick}
        />
        {
          watchlists.map(([id, watchlist]) => (
            ! isWatched(watchlist)
            ?  <ListItem
              key={id}
              value={id}
              primaryText={watchlist ? watchlist.name : ''}
              onClick={() => select(id)}
              insetChildren={true}
            />
            : null
          ))
        }
      </List>
    </Paper>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(WatchForm);
