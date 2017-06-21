import React from "react";

const fullPanelStyle = {
  position: "fixed",
  top: 68,
  left: 0,
  width: "100%",
  height: "calc(100% - 175px)",
  padding: "2rem 1.5rem",
  lineHeight: "1.5rem",
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
      selectContent,
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
        <img
          onClick={closeContent}
          src="../../close.svg"
          alt='close'
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 8,
            right: 20
          }}
        />
        <img
          onClick={this.handleLike}
          src="../../like.svg"
          alt='like'
          style={{
            cursor: "pointer",
            position: "fixed",
            height: 40,
            width: 40,
            bottom: 50,
            right: 20
          }}
        />
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
