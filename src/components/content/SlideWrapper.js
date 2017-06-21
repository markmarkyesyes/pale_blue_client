import React from 'react';

export default class SlideWrapper extends React.Component {

  handleOnClick = () => {
    const { selectContent, dot } = this.props;
    selectContent(dot);
  }

  render() {
    const { children } = this.props;

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'show'
        }}
      >
        <img
          onClick={this.handleOnClick}
          src='../../open.svg'
          alt='enlarge content'
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: 7,
            bottom: 5
          }}
        />
        {children}
      </div>
    )
  }
}
