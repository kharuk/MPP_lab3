import React, {Component} from 'react';
import SignUpForm from './SignUpForm';
import './styles/login.scss';
import Logo from './Logo';

class Register extends Component {

    render() {
      return (
        <section className="page-content authentication__form">
          <div class='container'>
            <div className="authentication__content">
              <Logo 
                src={"../images/registration-form-2.jpg"} 
                alt={"sing in image"}
              />
              <SignUpForm />  
            </div>
          </div>
        </section>
      )
    }
}

export default Register;