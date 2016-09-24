import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

import Thread from 'components/Thread';
import Group from 'components/Group';

import { CSSGrid, layout, measureItems, makeResponsive } from 'react-stonecutter';

const Grid = makeResponsive(measureItems(CSSGrid), {
  maxWidth: 1920,
  minPadding: 100
});

class ResourceList extends Component {
  transitionTo(path) {
    return () => {
      this.props.dispatch(push(path));
    };
  }

  render() {
    return (
      <div id='resource-list'>
        <Grid
          component="ul"
          columns={2}
          columnWidth={250}
          gutterWidth={16}
          gutterHeight={16}
          layout={layout.pinterest}
          duration={400}
          easing="ease-out"
        >
          {
            this.props.groups.map(id => <li id='no-indent' key={id} itemHeight={200}><Group
              key={id}
              id={id}
          /></li>)
          }
          {
            this.props.threads.map(id => <li id='no-indent' key={id} itemHeight={200}><Thread
              key={id}
              id={id}
            /></li>)
          }
        </Grid>
      </div>
    );
  }
}

ResourceList.defaultProps = {
  groups: [],
  threads: [],
}

export default connect()(ResourceList);