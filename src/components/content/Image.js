import React from 'react';

export default class Image extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <img
        src={data}
        alt={''}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          margin: 'auto'
        }}
      />
    );
  }
}
