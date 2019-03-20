import React, {Component} from 'react';

class Logo extends Component {

    render() {
      return (
        <div className="authentication__image">
          <img src={this.props.src} alt={this.props.alt} />
        </div> 
      )
    }
}

export default Logo;