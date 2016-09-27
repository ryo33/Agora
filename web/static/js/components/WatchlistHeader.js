import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey900 } from 'material-ui/styles/colors';
import { Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import WatchlistActions from 'components/WatchlistActions';
import { WatchlistIcon } from 'components/icons/index';

import { requireWatchlist } from 'hocs/resources';

const mapStateToProps = ({ theme, watchlists }, { id }) => {
  return {
    watchlist: watchlists[id],
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

class WatchlistHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, push } = this.props;
    push('/watchlists/' + id);
  }

  render() {
    const { id, watchlist } = this.props;
    const title = (
      <span
        onClick={this.handleClick}
      >
        <WatchlistIcon />
        {`  ${watchlist.name}  `}
      </span>
    );
    return (
      <Card
        initiallyExpanded={false}
      >
        <CardTitle
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
          subtitle="Watchlist description"
        />
        <CardActions expandable={true}>
          <WatchlistActions id={id} />
        </CardActions>
    </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireWatchlist(WatchlistHeader));
