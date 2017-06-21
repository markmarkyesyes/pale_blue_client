import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const initialState = {
  data: ""
};

export default class DemoForm extends React.Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitAfterReg = this.submitAfterReg.bind(this);
  }


  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    this.props.regUser()

    this.submitAfterReg();
  }

  submitAfterReg() {
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
          onTouchTap={this.handleSubmit}
          style={this.props.buttonStyle}
        />
      </div>
    );
  }
}