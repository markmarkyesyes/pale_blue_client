import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";

class Logout extends Component {
  constructor() {
    super();

    this.state = {
      showing: false
    };
  }
  componentDidMount() {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("user_id")) {
      this.setState({ showing: true });
      return;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("user_id")) {
      this.setState({ showing: true });
      return;
    }
  }

  handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.setState({ showing: false });
  };

  render() {
    if (this.state.showing) {
      return (
        <RaisedButton
          label="Logout"
          primary={true}
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

export default connect(mapStateToProps)(Logout);
