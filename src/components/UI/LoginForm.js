import React from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { disabledButton } from "../../helpers/validation";
import { loginUser } from "../../actions/sessionActions";

const initialState = {
  open: false,
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  serverError: null
};

class LoginForm extends React.Component {
  state = initialState;

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError) {
      this.setState({
        ...this.state,
        serverError: nextProps.serverError,
        open: true
      });
    } else {
      this.setState({ ...this.state, serverError: null, open: false });
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      emailError: "",
      passwordError: ""
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState(initialState);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { validateEmail, validatePassword, loginUser } = this.props;

    let emailError = validateEmail(this.state.email);
    let passwordError = validatePassword(this.state.password);
    if (emailError || passwordError) {
      this.setState({
        emailError,
        passwordError
      });
    } else {
      loginUser(this.state.email, this.state.password);
    }
  };

  render() {
    const disabled = disabledButton(
      this.state,
      this.state.emailError,
      this.state.passwordError
    );

    return (
      <div style={{width: '100%'}}>
        <RaisedButton
          label="Log In"
          primary={true}
          onTouchTap={this.handleOpen}
          style={{width: '95%'}}
        />
        <Dialog
          title={"Log In"}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ textAlign: "center" }}
        >
          <form onSubmit={this.handleSubmit}>
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
            <h3>
              {this.state.serverError ? this.state.serverError.message : ""}
            </h3>
            <RaisedButton
              label="Continue"
              primary={true}
              type="submit"
              disabled={disabled}
              style={this.props.buttonStyle}
              fullWidth={true}
            />
          </form>
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
    loginUser: (email, password) => {
      dispatch(loginUser(email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
