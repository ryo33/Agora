import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey900 } from 'material-ui/styles/colors';
import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import WatchlistActions from 'components/WatchlistActions';
import { WatchlistIcon } from 'components/icons/index'
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
  componentDidMount () {
    this.props.onRender();
  }

  render() {
    const { id, watchlist, push, zDepth, theme } = this.props;
    const title = <div>
      {WatchlistIcon}
      {`  ${watchlist.name}  `}
    </div>
    return (
      <Card
        onClick={() => push('/watchlists/' + id)}
        style={theme.watchlist.root}
        zDepth={zDepth}
      >
        <CardTitle title={title} subtitle="Watchlist description" />
        <CardActions expandable={true}>
          <WatchlistActions id={id} />
        </CardActions>
    </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireWatchlist(Watchlist));
