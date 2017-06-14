import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { disabledButton } from "../../helpers/validation";
const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: ""
};

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      emailError: "",
      passwordError: ""
    });
  }

  handleSubmit() {
    let emailError = this.props.validateEmail(this.state.email);
    let passwordError = this.props.validatePassword(this.state.password);
    if (emailError || passwordError) {
      this.setState({
        emailError,
        passwordError
      });
    } else {
      this.props.handleLogin(this.state.email, this.state.password);
      this.setState(initialState);
    }
  }

  render() {
    const disabled = disabledButton(
      this.state,
      this.state.emailError,
      this.state.passwordError
    );

    return (
      <div>
        <TextField
          name="email"
          type="email"
          hintText="Email"
          value={this.state.email}
          errorText={this.state.emailError}
          onChange={this.handleInputChange}
          style={this.props.inputStyle}
        />
        <TextField
          name="password"
          type="password"
          hintText="Password"
          value={this.state.password}
          errorText={this.state.passwordError}
          onChange={this.handleInputChange}
          style={this.props.inputStyle}
        />
        <h3>{this.state.serverError}</h3>
        <RaisedButton
          label="Continue"
          primary={true}
          onTouchTap={this.handleSubmit}
          disabled={disabled}
          style={this.props.buttonStyle}
        />
        <p style={{ textAlign: "center" }}>
          Need to create an account?
          {" "}
          <strong>
            <a href="#" onClick={this.props.handleSwapForm}>Sign up</a>
          </strong>.
        </p>
      </div>
    );
  }
}

export default LoginForm;
