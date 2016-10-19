import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import GroupForm from 'components/GroupForm';
import { EditIcon } from 'components/icons/index';
import { editGroup } from 'actions/resources';

const mapStateToProps = ({ groups }, { id }) => {
  const group = groups[id];
  return {
    group
  }
};

const actionCreators = {
  editGroup
};

class EditGroupAction extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      isOpen: false
    };
  }

  open() { this.setState({isOpen: true}); }
  close() { this.setState({isOpen: false}); }

  submit(params) {
    const { id, editGroup } = this.props;
    this.close();
    editGroup(id, params);
  }

  render() {
    const { id, group } = this.props;
    return (
      <span>
        <FlatButton
          icon={<EditIcon />}
          label="Edit"
          onClick={this.open}
        />
        <Dialog
          open={this.state.isOpen}
          onRequestClose={this.close}
          bodyStyle={{padding: 0}}
        >
          <GroupForm
            titleText={"Edit this Group"}
            close={this.close}
            submit={this.submit}
            editMode={true}
            {...group}
          />
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(EditGroupAction);
