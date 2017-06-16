import React from 'react';

export default class Image extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <img src={data} alt={''} style={{height: '100%', objectFit: 'cover'}}/>
    );
  }
}
