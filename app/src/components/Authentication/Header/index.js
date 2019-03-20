import React, {Component} from 'react';
import '../styles/login.scss';

class Header extends Component {

    render() {
      return (
        <h3 className={`authentication__header ${this.props.className}`}>{this.props.header}</h3>
      )
    }
}

export default Header;