import React, { Component } from 'react';

class PageHeader extends Component {

  render() {
    return (
      <h2>{this.props.header}</h2>
    );
  }
}
export default PageHeader;
