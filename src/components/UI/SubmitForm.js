import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import { uploadToS3 } from '../../helpers/s3';

function getFileInput() {
  return document.querySelector('.file-input');
}

const initialState = {
  contentType: "text",
  data: ""
};

export default class SubmitForm extends React.Component {

  state = initialState;

  handleSelectChange = (event, index, value) => {
    if (value === "image") {
      this.setState({ contentType: value }, this.attachInputListener);
    } else if (value === "text") {
      this.removeInputListener();
      this.setState({ contentType: value });
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTextSubmit = () => {
  	const { contentType, data } = this.state;
  	const { lng, lat } = this.props.userLocation;
  	const content = {
  		contentType,
  		data,
  		lng,
  		lat,
  		userId: localStorage.getItem("user_id")
  	};
    this.props.handleSubmit(content);
    this.setState(initialState);
  }

  handleImageSelect = e => {
    const label = e.target.previousElementSibling;
    const labelValue = label.innerHTML;
    let fileName = "";
    if (e.target.files && e.target.files.length) {
      fileName = e.target.value.split("\\").pop();
    }
    if (fileName) {
      label.innerHTML = fileName;
    } else {
      label.innerHTML = labelValue;
    }
  }

  handleImageSubmit = () => {
    const { contentType } = this.state;
    const { lng, lat } = this.props.userLocation;

    const input = getFileInput();
    if (!input.files || !input.files.length) {
      return;
    }
    const file = input.files[0];

    uploadToS3(file)
      .then(url => {
        const content = {
          contentType,
          data: url,
          lng,
          lat,
          userId: localStorage.getItem("user_id")
        };
        this.props.handleSubmit(content);
        this.setState(initialState);
      });
  }

  attachInputListener = () => {
    const input = getFileInput();
    if (input) input.addEventListener("change", this.handleImageSelect);
  }

  removeInputListener = () => {
    const input = getFileInput();
    if (input) input.removeEventListener("change", this.handleImageSelect);
  }

  render() {
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
        {this.state.contentType === "text" ?
          (
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
                onTouchTap={this.handleTextSubmit}
                style={this.props.buttonStyle}
              />
            </div>
  	      ) : (
            <div>
              <RaisedButton
                style={{ display: 'block' }}
                secondary={true}
                label="Choose an Image"
                labelPosition="before"
                labelStyle={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                containerElement="label"
              >
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    width: '100%',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    opacity: 0
                  }}
                />
              </RaisedButton>
              <RaisedButton
                label="Continue"
                primary={true}
                onTouchTap={this.handleImageSubmit}
                style={this.props.buttonStyle}
              />
            </div>
          )
      	}
      </div>
    );
  }
}
