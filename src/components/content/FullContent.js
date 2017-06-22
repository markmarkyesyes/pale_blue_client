import React from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';

const fullPanelStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "calc(100% - 140px)",
  padding: "3.5rem 1.5rem 1.5rem",
  lineHeight: 1.5,
  backgroundColor: "#e3e3e3",
  overflowY: "scroll",
  zIndex: 1000000
};

export default class FullContent extends React.Component {
  handleLike = () => {
    const {
      selectedContent,
      userLocation,
      userId,
      submitLike,
      closeContent
    } = this.props;
    if (userLocation.lng && userLocation.lat && userId && selectedContent._id) {
      const like = {
        fromLng: userLocation.lng,
        fromLat: userLocation.lat,
        fromUserId: userId,
        contentId: selectedContent._id
      };
      submitLike(like);
    } else {
      alert("You must logged in to like something");
    }
    closeContent();
  };

  render() {
    const { selectedContent, closeContent } = this.props;

    if (!selectedContent) return null;

    return (
      <div style={fullPanelStyle}>
        <FloatingActionButton
          onTouchTap={this.handleLike}
          mini={true}
          secondary={true}
          style={{
            position: "fixed",
            height: 40,
            width: 40,
            top: 15,
            left: 15
          }}
        >
          <img
            src="../../like.svg"
            alt='like'
            style={{width: '65%'}}
          />
        </FloatingActionButton>

        <FloatingActionButton
          onTouchTap={closeContent}
          mini={true}
          style={{
            position: "fixed",
            top: 15,
            right: 15
          }}
        >
          <img
            src="../../close.svg"
            alt='close'
            style={{width: '75%'}}
          />
        </FloatingActionButton>

        {switchContent(selectedContent)}

      </div>
    );
  }
}

function switchContent(dot) {
  switch (dot.contentType) {
    case "text":
      return fullTextContent(dot.data);
    case "image":
      return fullImageContent(dot.data);
    default:
      return null;
  }
}

function fullTextContent(data) {
  return <p>{data}</p>;
}

function fullImageContent(data) {
  return (
    <img
      src={data}
      alt=''
      style={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "100%",
        maxHeight: "100%"
      }}
    />
  );
}
