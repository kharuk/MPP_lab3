import React, {Component} from 'react';
import Input from '../Input';
import Button from '../Button';
import '../styles/login.scss';
import Header from '../Header';
import { userActions } from '../../../actions';
import { connect } from 'react-redux';
import { ValidationForm} from "react-bootstrap4-form-validation"; 

class SignInForm extends Component {

    constructor(props) {
      super(props);

      // reset login status
      this.props.dispatch(userActions.logout());

      this.state = {
          username: '',
          password: '',
          submitted: false
      };
    }

    handleChange = (e) => { 
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
      const { loggingIn } = this.props;
      const { username, password, submitted } = this.state;
      return (
        <div className="authentication__form-wrapper">
          <Header header={'Sign In Form'}/>
          <form onSubmit={this.handleSubmit} className='authentication__form-content'>
            <Input 
            name="username" 
            type={'email'} 
            placeholder={'User Name'} 
            onChange={this.handleChange}
            caption={"Email is required"}
            submitted={submitted}
            param={username}
            />

            <Input 
              name="password" 
              type={'password'} 
              placeholder={'Password'} 
              onChange={this.handleChange}
              caption={"Password is required"}
              submitted={submitted}
              param={password}
            />
            {/* <Button text={"Sign In"}/> */}
            <button className="authentication__form-button">Login</button>
          </form>
        </div> 
        
      )
    }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
      loggingIn
  };
}

export default connect(mapStateToProps)(SignInForm);