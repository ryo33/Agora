import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';

import { UserIcon, ThreadIcon, GroupIcon } from 'components/icons';
import SignIn from 'components/SignIn';

const styles = {
  card: {
    margin: "14px"
  }
};

const HomeComponent = ({ push }) => (
  <div>
    <Card style={styles.card}>
      <CardText>
        <h2>README</h2>
        <p><UserIcon />Users:<br />You can create multiple users and choose a user for each posts.</p>
        <p><ThreadIcon />Threads:<br />Threads is the place to post.</p>
        <p><GroupIcon />Groups:<br />Groups can have many threads, members, and groups.</p>
        <SignIn />
      </CardText>
    </Card>
    <Card style={styles.card}>
      <CardText>
        <p>
          <RaisedButton
            onClick={() => push("/threads")}
            label="All Threads"
            icon={<ThreadIcon />}
          />
        </p>
        <p>
          <RaisedButton
            onClick={() => push("/groups")}
            label="All Groups"
            icon={<GroupIcon />}
          />
        </p>
      </CardText>
    </Card>
  </div>
);

export const Home = connect(null, { push })(HomeComponent);
