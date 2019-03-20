import React, {Component} from 'react';
import Input from './index';

class InputGroup extends Component {
    render() {
      return (
        <div className="form-group authentication__input_group">
          <Input type={'text'} placeholder={'First Name'} input_half_size={"form-login__input-half"}/>
          <Input type={'text'} placeholder={'Last Name'} input_half_size={"form-login__input-half"}/>
        </div>
      )
    }
}

export default InputGroup;