import React, {Component} from 'react';
import '../styles/login.scss';

class Select extends Component {

    render() {
      return (
        <option value={this.props.value}>{this.props.item}</option>
      )
    }
}

export default Select;