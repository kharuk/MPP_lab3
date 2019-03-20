import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import '../styles/login.scss';
//import { links } from '../../../config/links';

class Button extends Component {

  render() {
    return (
      <div className="authentication__form-button" >
{/*         <Link 
          to={links.FILM_SEARCH_PAGE} 
          className="authentication__form-button" 
          role="button"
        >
          
        </Link> */}
        {this.props.text}
      </div>
    )
  }
}

export default Button;