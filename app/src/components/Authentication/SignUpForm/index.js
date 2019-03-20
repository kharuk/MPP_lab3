import React, {Component} from 'react';
import Header from '../Header';
import Input from '../Input';
import InputGroup from '../Input/InputGroup';
import Select from '../Select';
import Button from '../Button';
import '../styles/login.scss';
import options from '../Option/optionData.json';

class SignUpForm extends Component {

    render() {
      return (
        <div className="authentication__form-wrapper">
          <Header header={'Sign Up Form'}/>
          <form action="" className='authentication__form-content'>
            <InputGroup />
            <Input type={'text'} placeholder={'User Name'}/>
            <Input type={'text'} placeholder={'City'}/>
            <Select options={options}/>
            <Input type={'password'} placeholder={'Password'}/>
            <Input type={'password'} placeholder={'Confirm Password'}/>
            <Button text={"Register"}/>
          </form>
        </div>     
      )
    }
}

export default SignUpForm;