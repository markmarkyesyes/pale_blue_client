import React from "react";
import { connect } from "react-redux";
import { Dialog, TextField, RaisedButton } from "material-ui";
import { disabledButton } from "../../helpers/validation";
import { regUser } from "../../actions/sessionActions";

class SignupForm extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      email: "",
      password: ""
    };
  }

  handleSignupOpen = () => {
    this.setState({ open: true });
  };

  handleSignupClose = () => {
    this.setState({ open: false });
  };

  handleNotificationClose = () => {
    this.setState({ notification: false });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    this.props.regUser(this.state.email, this.state.password);
    this.handleSignupClose();
  };

  render() {
    const emailError = this.props.validateEmail(this.state.email);
    const passwordError = this.props.validatePassword(this.state.password);
    const disabled = disabledButton(this.state, emailError, passwordError);
    return (
      <div style={{ width: "100%" }}>
        <RaisedButton
          label="Sign Up"
          primary={true}
          onTouchTap={this.handleSignupOpen}
          style={{ width: "95%" }}
        />
        <Dialog
          title={"Sign Up"}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleSignupClose}
          style={{ textAlign: "center" }}>
          <TextField
            name="email"
            type="email"
            hintText="Email"
            value={this.state.email}
            errorText={emailError}
            onChange={this.handleInputChange}
            style={this.props.inputStyle}
          />
          <TextField
            name="password"
            type="password"
            hintText="Password"
            value={this.state.password}
            errorText={passwordError}
            onChange={this.handleInputChange}
            style={this.props.inputStyle}
          />
          <p>
            {" "}On successful registration, you will receive an email to verify
            your account.{" "}
          </p>
          <p>
            {" "}If you do not verify your account within 3 days, your account
            will be removed.{" "}
          </p>
          <RaisedButton
            label="Continue"
            primary={true}
            type="submit"
            onTouchTap={this.handleSubmit}
            disabled={disabled}
            style={this.props.buttonStyle}
            fullWidth={true}
          />
        </Dialog>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    serverError: state.session.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    regUser: (email, password) => {
      dispatch(regUser(email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
