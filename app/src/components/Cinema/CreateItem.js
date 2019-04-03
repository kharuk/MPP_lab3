import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation"; 
import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';
let socket = io(`http://localhost:8000`);

class CreateItem extends Component {

  state = {
    cinema_name: '',
    cinema_phone: '',
    cinema_address:'',
    isRedirect: false
  }

  constructor(props){
    super(props);
    let token = JSON.parse(window.localStorage.getItem('user')).data.token;
    this.socket = io(`http://localhost:8000`,{
    query: {
        token: token,
      },
    });
  }

  componentDidMount() {
    this.socket.on('error', function(err){
      toastr.error(err);
     // this.setState({ isRedirect: true });
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const obj = {
      name: this.state.cinema_name,
      phone: this.state.cinema_phone,
      address: this.state.cinema_address
    };
    this.socket.emit('create cinema', obj)
    this.setState({
      cinema_name: '',
      cinema_phone: '',
      cinema_address:'',
      isRedirect: true
    })
  }

  onChangeName = (e) => {
    this.setState({
      cinema_name: e.target.value
    });
  }

  onChangePhone = (e) => {
    this.setState({
      cinema_phone: e.target.value
    });
  }

  onChangeAddress = (e) => {
    this.setState({
      cinema_address: e.target.value
    });
  }

  render() {

    if (this.state.isRedirect) {
      return <Redirect to={'/cinemas/'}/>
    }

    return (
      <section className="container container__margin" >
        <h3>{this.props.header}</h3>
        <ValidationForm onSubmit={this.onSubmit} ref={this.form} autoComplete="off" className="needs-validation" noValidate>
          <div>
            <div className="form-group col-md-6">
              <label>Name</label>
              <TextInput 
                type="text" 
                className="form-control" 
                name="name" 
                placeholder="name" 
                maxLength="30" 
                value={this.state.cinema_name} 
                onChange={this.onChangeName}
                required
                successMessage="Looks good!"
              />
          </div>
          <div className="form-group col-md-6">
            <label>Phone (7 digit)</label>
            <TextInput 
                type="tel" 
                pattern="^\d{7}$" 
                className="form-control" 
                name="phone" 
                placeholder="phone" 
                value={this.state.cinema_phone}
                onChange={this.onChangePhone} 
                required
                errorMessage="Please enter 7 digit mobile number."
            /> 
        </div>
        <div className="form-group col-md-6">
            <label>Address</label>
            <TextInput 
                type="text" 
                className="form-control" 
                name="address" 
                placeholder="address" 
                maxLength="60" 
                value={this.state.cinema_address}
                onChange={this.onChangeAddress}
                required
                errorMessage="Please write an address."
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-info"> Submit</button>
          <Link className="btn btn-secondary" to="/cinemas">Back</Link>
        </div>
      </ValidationForm>
    </section>
    );
  }
}
export default CreateItem;