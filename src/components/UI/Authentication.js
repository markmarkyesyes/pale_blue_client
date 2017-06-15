import React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { connect } from "react-redux";
import { loginUser, regUser } from "../../actions/sessionActions";

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

class Authentication extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      login: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError) {
      this.setState({
        open: true,
        login: true
      });
    } else {
      this.setState({
        ...this.state,
        open: false
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin = (email, pass) => {
    this.props.loginUser({ email, pass });
  };

  handleSignup = (email, pass) => {
    this.props.regUser({ email, pass });
  };

  handleSwapForm = () => {
    this.setState({ login: !this.state.login });
  };

  render() {
    return (
      <div>
        <RaisedButton label="Registration" onTouchTap={this.handleOpen} />
        <Dialog
          title={this.state.login ? "Log In" : "Sign Up"}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ textAlign: "center" }}>
          {this.state.login
            ? <LoginForm
                serverError={this.props.serverError}
                handleLogin={this.handleLogin}
                handleSwapForm={this.handleSwapForm}
                handleClose={this.handleClose}
                validateEmail={validateEmail}
                validatePassword={validatePassword}
                inputStyle={inputStyle}
                buttonStyle={buttonStyle}
              />
            : <SignupForm
                handleSignup={this.handleSignup}
                handleSwapForm={this.handleSwapForm}
                handleClose={this.handleClose}
                validateEmail={validateEmail}
                validatePassword={validatePassword}
                inputStyle={inputStyle}
                buttonStyle={buttonStyle}
              />}
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
    loginUser: creds => {
      dispatch(loginUser(creds));
    },
    regUser: creds => {
      dispatch(regUser(creds));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
