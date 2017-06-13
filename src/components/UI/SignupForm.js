import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { disabledButton } from "../../helpers/validation";

export default class SignupForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    this.props.handleSignup(this.state.email, this.state.password);
    this.props.handleClose();
  }

  render() {
    const emailError = this.props.validateEmail(this.state.email);
    const passwordError = this.props.validatePassword(this.state.password);
    const disabled = disabledButton(this.state, emailError, passwordError);

    return (
      <div>
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
        <RaisedButton
          label="Continue"
          primary={true}
          type="submit"
          onTouchTap={this.handleSubmit}
          disabled={disabled}
          style={this.props.buttonStyle}
        />
        <p style={{ textAlign: "center" }}>
          Already have an account?
          {" "}
          <strong>
            <a href="#" onClick={this.props.handleSwapForm}>Log in</a>
          </strong>.
        </p>
      </div>
    );
  }
}
