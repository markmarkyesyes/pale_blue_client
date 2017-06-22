import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { logout } from "../../actions/sessionActions";
class Logout extends Component {
  handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.props.logout();
  };

  render() {
    if (this.props.isAuthed || localStorage.getItem("token")) {
      return (
        <RaisedButton
          label="Logout"
          primary={true}
          onTouchTap={this.handleLogout}
          style={{minWidth: 0}}
          labelStyle={{
            fontSize: 14,
            padding: "0 10px"
          }}
        />
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = state => {
  return {
    isAuthed: state.session.isAuthed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
