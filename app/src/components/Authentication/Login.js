import React, {Component} from 'react';
import SignInForm from './SignInForm';
import './styles/login.scss';
import Logo from './Logo';


class Login extends Component {

  render() {
    return (
      <section className="page-content authentication__form">
        <div class='container'>
          <div className="authentication__content">
            <Logo 
              src={"../images/registration-form-2.jpg"} 
              alt={"sing in image"}
            />
            <SignInForm />  
          </div>
        </div>
      </section>
    )
  }
}

export default Login;