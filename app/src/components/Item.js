import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <td>{this.props.item}</td>
    );
  }
}
export default Item;