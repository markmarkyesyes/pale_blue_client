import React from 'react';

const style={
  backgroundColor: '#FFD700',
  padding: '1rem 1rem',
  height: '100%',
  textOverflow: 'ellipsis'
}

export default class Text extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={style}>
        {data}
      </div>
    );
  }
}
