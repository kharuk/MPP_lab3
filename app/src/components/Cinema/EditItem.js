import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation"; 

class CreateItem extends Component {
  state = {
    cinema_name: '',
    cinema_phone: '',
    cinema_address:'',
    isRedirect: false
  }

  componentDidMount() {
    axios.get('http://localhost:8080/cinemas/edit/'+this.props.match.params.id)
      .then(response => {
          this.setState({ 
            cinema_name: response.data.name,
            cinema_phone: response.data.phone,
            cinema_address: response.data.address
            });
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.cinema_name,
      phone: this.state.cinema_phone,
      address: this.state.cinema_address
    };
    axios.put('http://localhost:8080/cinemas/edit/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data))
        .then(()=> {
          this.setState({ 
            isRedirect: true
          });
        })
        .catch(function (error) {
          console.log(error);
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
        <ValidationForm onSubmit={this.onSubmit} autoComplete="off" className="needs-validation" noValidate>
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
            <label>Phone</label>
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