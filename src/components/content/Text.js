import React from 'react';

export default class Text extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <p style={{padding: '0.5rem 0.5rem'}}>{data}</p>
    );
  }
}
