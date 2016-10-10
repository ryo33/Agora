import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey800, grey700 } from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Loading from 'components/Loading';
import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import ThreadActions from 'components/ThreadActions';

import { ThreadIcon, PostIcon } from 'components/icons/index'

import { requireThread } from 'hocs/resources';

const mapStateToProps = ({ threads, theme }, { id }) => {
  return {
    thread: threads[id],
    theme
  };
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

class Thread extends Component {
  componentDidMount () {
    this.props.onRender();
  }

  render() {
    const { id, thread, push, zDepth, theme } = this.props;
    const title = <div>
      <ThreadIcon style={theme.resource.title_icon} color={grey800}/>
      {`  ${thread.title}  `}
    </div>
    return (
      <Card
        onTouchTap={() => push('/threads/' + id)}
        style={theme.resource.root}
        containerStyle={{padding: 0}}
        zDepth={zDepth}
      >
        <CardTitle
          title={title} titleStyle={theme.resource.title_text}
          style={theme.resource.title} titleColor={grey800}
        />
        <div style={{padding: "0 0.5em"}}><Divider /></div>
        <CardText className='center' style={theme.resource.text} color={grey700}>
          <PostIcon style={theme.resource.text_icon} color={grey700}/>
          {`  ${thread.posts}  `}
        </CardText>
        <CardActions expandable={true}>
          <ThreadActions id={id} />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireThread(Thread));
