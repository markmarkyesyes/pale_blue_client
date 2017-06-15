import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

const initialState = {
  contentType: "text",
  data: ""
};

export default class SubmitForm extends React.Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectChange(event, index, value) {
    this.setState({
      contentType: value
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
  	const { contentType, data } = this.state;
  	const { lng, lat } = this.props.userLocation;
  	const content = {
  		contentType,
  		data,
  		lng,
  		lat,
  		userId: localStorage.getItem("user_id")
  	}
    this.props.handleSubmit(content);
    this.setState(initialState);
  }


  render() {
    // const disabled = disabledButton(
    //   this.state,
    //   this.state.emailError,
    //   this.state.passwordError
    // );

    return (
      <div>
        <SelectField
          value={this.state.contentType}
          onChange={this.handleSelectChange}
          style={this.props.inputStyle}
        >
        	<MenuItem value="text" primaryText="Text" />
        	<MenuItem value="image" primaryText="Image" />
        </SelectField>
        {this.state.contentType === "text"
        	? <TextField
		          name="data"
		          type="text"
		          value={this.state.data}
		          onChange={this.handleInputChange}
		          style={this.props.inputStyle}
		        />
		      : <h3>Select image from filesystem</h3>
      	}
	
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