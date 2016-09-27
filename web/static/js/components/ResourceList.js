import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

import Thread from 'components/Thread';
import Group from 'components/Group';
import Watchlist from 'components/Watchlist';

import { CSSGrid, layout, measureItems, makeResponsive } from 'react-stonecutter';

class ResourceList extends Component {
  constructor() {
    super()
    this.onChildNodeDidMount = this.onChildNodeDidMount.bind(this)
    this.state = this.createGrid()
  }

  createGrid() {
    let Grid;
    Grid = makeResponsive(measureItems(CSSGrid), {
      maxWidth: 1980,
      minPadding: 8,
    });
    return { Grid, remeasured: false, loadedCount: 1 };
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

  transitionTo(path) {
    return () => {
      this.props.dispatch(push(path));
    };
  }

  render() {
    const {
      groups,
      threads,
      watchlists
    } = this.props;
    const { Grid } = this.state
    return (
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
          threads.map(id => <div key={id}><Thread
            key={id}
            id={id}
            onRender={this.onChildNodeDidMount}
          /></div>)
        }
        {
          groups.map(id => <div key={id}><Group
            key={id}
            id={id}
            onRender={this.onChildNodeDidMount}
          /></div>)
        }
        {
          watchlists.map(id => <div key={id}><Watchlist
            key={id}
            id={id}
            onRender={this.onChildNodeDidMount}
          /></div>)
        }
      </Grid>
    );
  }
}

ResourceList.defaultProps = { groups: [], threads: [], watchlists: [] };

export default connect()(ResourceList);
