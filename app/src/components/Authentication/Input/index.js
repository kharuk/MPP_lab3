import React, {Component} from 'react';
import '../styles/login.scss';

class Input extends Component {

    render() {
      return (
        <div className="form-group authentication__form-group">
         {/*} <label for={""} ><i></i></label>*/}
          <input 
            type={this.props.type} 
            name={this.props.name} 
            id={""} 
            placeholder={this.props.placeholder} 
            className={`form-control authentication__form-control ${this.props.input_half_size}`}
            onChange={this.props.onChange}
          />
          <i className=""></i>
          {this.props.submitted && !this.props.param &&
            <div className="help-block">{this.props.caption}</div>
          }
        </div>
      )
    }
}

export default Input;