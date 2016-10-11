import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey800, grey700 } from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

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
  componentWillMount () {
    this.props.onRender();
  }

  render() {
    const { id, watchlist, push, zDepth, theme } = this.props;
    const title = <div>
      <WatchlistIcon style={theme.resource.title_icon} color={grey800}/>
      {`  ${watchlist.name}  `}
    </div>
    return (
      <Card
        onTouchTap={() => push('/watchlists/' + id)}
        style={theme.resource.root}
        containerStyle={{padding: 0}}
        zDepth={zDepth}
      >
        <CardTitle
          title={title} titleStyle={theme.resource.title_text}
          style={theme.resource.title} titleColor={grey800}
        />
        <CardActions expandable={true}>
          <WatchlistActions id={id} />
        </CardActions>
    </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireWatchlist(Watchlist));
