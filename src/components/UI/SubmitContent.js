import React, { Component } from "react";
import { connect } from "react-redux";
import { Dialog } from "material-ui";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SubmitButton from "./SubmitButton";
import SubmitForm from "./SubmitForm";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { submitDot } from "../../actions/submitDot";

const inputStyle = {
  textAlign: "left",
  display: "block",
  margin: "0.5rem 0",
  width: "100%"
};

const buttonStyle = {
  margin: "1rem 0",
  textTransform: "uppercase"
};

const authentication = () => (
  <div>
    <p style={{marginTop: 0}}>
      You must log in to submit content for others to see.
    </p>
    <div style={{
      marginTop: 20,
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <LoginForm
        validateEmail={validateEmail}
        validatePassword={validatePassword}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
      />
      <SignupForm
        validateEmail={validateEmail}
        validatePassword={validatePassword}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
        style={{marginLeft: 'auto'}}
      />
    </div>
  </div>
);

class SubmitContent extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = (content) => {
    console.log(content);
    this.props.submitDot(content);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <SubmitButton handleClick={this.handleClick} />
        <Dialog
          title="Leave Something Behind"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ textAlign: "center" }}
        >
          {localStorage.getItem("token") || this.props.session._id
            ? <SubmitForm
                handleSubmit={this.handleSubmit}
                userLocation={this.props.userLocation}
                inputStyle={inputStyle}
                buttonStyle={buttonStyle}
              />
            : authentication()
          }
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocation: state.userLocation.data,
    session: state.session.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitDot: content => {
      dispatch(submitDot(content));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitContent);
