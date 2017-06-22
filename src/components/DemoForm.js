import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const initialState = {
  data: ""
};

export default class DemoForm extends React.Component {
  state = initialState;

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.regUser()
    this.submitAfterReg();
  }

  submitAfterReg = () => {
    if (localStorage.getItem("user_id")) {
      console.log("found user, continuing");
      const contentType = "text";
      const { data } = this.state;
      const { lng, lat } = this.props.userLocation;
      const content = {
        contentType,
        data,
        lng,
        lat,
        userId: localStorage.getItem("user_id")
      }
      this.props.handleSubmit(content);
      this.props.startDemo();
      this.setState(initialState);
    } else {
      setTimeout(() => {
        console.log("didn't find user, repeating");
        this.submitAfterReg()
      }, 100)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="data"
            type="text"
            value={this.state.data}
            onChange={this.handleInputChange}
            style={this.props.inputStyle}
          />
          <RaisedButton
            label="Continue"
            primary={true}
            type="submit"
            style={this.props.buttonStyle}
            fullWidth={true}
          />
        </form>
      </div>
    );
  }
}
