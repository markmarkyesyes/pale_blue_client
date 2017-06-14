import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import SubmitForm from "./SubmitForm";
import { Dialog } from "material-ui";
import { connect } from "react-redux";
// import { submitContent } from "../../actions/submitActions";

class SubmitContent extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div>
        <SubmitButton handleClick={this.handleClick} />
        <Dialog
          title="Make a Post!"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ textAlign: "center" }}>
          <SubmitForm />
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  // return {
  //   submitContent: content => {
  //     dispatch(submitContent(content));
  //   }
  // };
};

export default connect(null, mapDispatchToProps)(SubmitContent);
