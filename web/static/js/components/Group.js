import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey800, grey700 } from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Unimplemented from 'components/Unimplemented';
import GroupActions from 'components/GroupActions';

import { GroupIcon, ThreadIcon, UserIcon } from 'components/icons/index'

import { requireGroup } from 'hocs/resources';

const mapStateToProps = ({ theme, groups }, { id }) => {
  return {
    group: groups[id],
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

class Group extends Component {
  componentWillMount () {
    this.props.onRender();
  }

  render() {
    const { id, group, push, zDepth, theme } = this.props;
    const title = <div>
      <GroupIcon style={theme.resource.title_icon} color={grey800}/>
      {`  ${group.name}  `}
    </div>
    return (
      <Card
        onTouchTap={() => push('/groups/' + id)}
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
          <ThreadIcon style={theme.resource.text_icon} color={grey700}/>
          {`  ${group.threads}  `}
          <GroupIcon style={theme.resource.text_icon} color={grey700}/>
          {`  ${group.groups}  `}
          <UserIcon style={theme.resource.text_icon} color={grey700}/>
          {`  ${group.members}  `}
        </CardText>
        <CardActions expandable={true}>
          <GroupActions id={id} />
        </CardActions>
    </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireGroup(Group));
