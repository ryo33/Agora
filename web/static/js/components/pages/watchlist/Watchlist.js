import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import { SignedIn } from 'components/util';
import Group from 'components/Group';
import Thread from 'components/Thread';
import Post from 'components/Post';
import User from 'components/User';

import {
  openWatchlistPage,
  closeWatchlistPage
} from 'actions/watchlistPage';
import WatchlistComponent from 'components/Watchlist';

const styles = {
  divider: {
    marginTop: "2%",
    marginBottom: "2%"
  },
  paper: {
    padding: "1% 2%",
    marginLeft: "2%"
  }
};

const mapStateToProps = ({ watchlistPage }, { params }) => {
  return {
    groups: watchlistPage.groups,
    threads: watchlistPage.threads,
    id: params.id
  }
}

const actionCreaters = {
  openWatchlistPage, closeWatchlistPage
};

class Watchlist extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { openWatchlistPage, id } = this.props;
    openWatchlistPage(id);
  }

  componentWillUnmount() {
    const { closeWatchlistPage, id } = this.props;
    closeWatchlistPage(id);
  }

  render() {
    const {
      groups, threads, params, theme
    } = this.props;
    const groupItems = groups.map(({ id, groups, threads, members }) => {
      const list = [];
      let insertedAt = null;
      list.push(...groups.map(({ id, inserted_at }) => {
        insertedAt = Math.max(insertedAt, inserted_at);
        return <Group key={'g-' + id} id={id} />;
      }));
      list.push(...threads.map(({ id, inserted_at }) => {
        insertedAt = Math.max(insertedAt, inserted_at);
        return <Thread key={'t-' + id} id={id} />;
      }));
      list.push(...members.map(({ id, inserted_at }) => {
        insertedAt = Math.max(insertedAt, inserted_at);
        return <User key={'u-' + id} id={id} />;
      }));
      const element = (
        <div>
          <Group id={id} />
          <Paper style={styles.paper}>{list}</Paper>
        </div>
      )
      return { length: list.length, key:'g-' + id, insertedAt, element }
    });
    const threadItems = threads.map(({ id, posts }) => {
      let insertedAt = null;
      const list = posts.map(({ id, inserted_at }) => {
        insertedAt = Math.max(insertedAt, inserted_at);
        return <Post key={id} id={id} />;
      });
      const element = (
        <div>
          <Thread id={id} />
          <Paper style={styles.paper}>{list}</Paper>
        </div>
      )
      return { length: list.length, key: 't-' + id, insertedAt, element }
    });
    const items = groupItems.concat(threadItems).filter(({ length }) => length != 0);
    items.sort((a, b) => b.insertedAt - a.insertedAt); // Desc
    return (
      <div>
        <WatchlistComponent
          id={params.id}
        />
        <Divider style={styles.divider} />
        {
          items.map(({ key, element }, index) => {
            return (
              <div key={key}>
                { index != 0 ? <Divider style={styles.divider} /> : null }
                {element}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreaters)(Watchlist);
