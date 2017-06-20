import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { logout } from "../../actions/sessionActions";

const style = {
  margin: 12
};

class Logout extends Component {
  handleLogout = () => {
    console.log("in handleclick");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.props.logout();
  };

  render() {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("user_id")) {
      return (
        <RaisedButton
          label="Logout"
          primary={true}
          style={style}
          onTouchTap={this.handleLogout}
        />
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = state => {
  return {
    session: state.session.data._id
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
