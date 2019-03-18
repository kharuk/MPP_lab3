import React, { Component } from 'react';
import Item from './Item';


class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {
            this.props.items.map( 
            item => <Item key={item} item={item} />)
          }
        </tr>
      </thead> 
    );
  }
}
export default TableHeader;
