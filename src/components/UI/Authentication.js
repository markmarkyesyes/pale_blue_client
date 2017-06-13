import React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { validateEmail, validatePassword } from '../../helpers/validation';

const inputStyle = {
  textAlign: "left",
  display: "block",
  margin: "0.5rem 0",
  width: "100%"
};

const buttonStyle = {
  margin: "1rem 0",
  width: "100%",
  textTransform: "uppercase"
};

export default class Authentication extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      login: true
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSwapForm = this.handleSwapForm.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleLogin() {
    console.log('logging in');
  }

  handleSignup() {
    console.log('signing up');
  }

  handleSwapForm() {
    this.setState({ login: !this.state.login });
  }

  render() {
    return (
      <div>
        <RaisedButton label="Registration" onTouchTap={this.handleOpen} />
        <Dialog
          title={this.state.login ? "Log In" : "Sign Up"}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{textAlign: "center"}}
        >
          {
            this.state.login ?
            (
              <LoginForm
                handleLogin={this.handleLogin}
                handleSwapForm={this.handleSwapForm}
                handleClose={this.handleClose}
                validateEmail={validateEmail}
                validatePassword={validatePassword}
                inputStyle={inputStyle}
                buttonStyle={buttonStyle}
              />
            ) : (
              <SignupForm
                handleSignup={this.handleSignup}
                handleSwapForm={this.handleSwapForm}
                handleClose={this.handleClose}
                validateEmail={validateEmail}
                validatePassword={validatePassword}
                inputStyle={inputStyle}
                buttonStyle={buttonStyle}
              />
            )
          }
        </Dialog>
      </div>
    );
  }
}
