import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';

import { requireWatchlist } from 'hocs/resources';

const mapStateToProps = ({ theme, watchlists }, { id }) => {
  return {
    watchlist: watchlists[id],
    theme
  }
};

const actionCreators = {
  push
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    dispatch
  };
};

class Watchlist extends Component {
  render() {
    const { id, watchlist, push, zDepth, theme } = this.props;
    return (
  <Card
    style={theme.watchlist.root}
    zDepth={zDepth}
  >
    <CardHeader
      style={theme.watchlist.header}
      title={<ResourceTitle
        insertedAt={watchlist.inserted_at}
        user={watchlist.user_id}
        title=""
      />}
      showExpandableButton={true}
    />
    <Divider />
    <CardText
      style={theme.watchlist.body}
      onClick={() => push('/watchlists/' + id)}
      style={{
        cursor: 'pointer'
      }}
    >
      {watchlist.name}
    </CardText>
    <CardActions expandable={true}>
      <Unimplemented />
    </CardActions>
  </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireWatchlist(Watchlist));
