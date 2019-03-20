import React, {Component} from 'react';
import '../styles/login.scss';
import Option from '../Option';

class Select extends Component {
  render() {
    return (
      <div className="form-group authentication__form-group">
        <select name="" id="" className="form-control form-login__select authentication__form-control">
        {
          this.props.options.map( 
          (item) => <Option key={item.id} item={item.name} value={item.value} />)
        }
        </select>
        <i className=""></i>
      </div>
    )
  }
}

export default Select;