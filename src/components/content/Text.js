import React from 'react';

const style={
  backgroundColor: '#FFD700',
  height: '100%'
};

export default class Text extends React.PureComponent {

  render() {
    return (
      <div style={style}>
        <img
          src='../../text.svg'
          alt='text'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '50%'
          }}
        />
      </div>
    );
  }
}
