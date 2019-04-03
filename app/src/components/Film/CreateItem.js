import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation"; 
import { toastr } from 'react-redux-toastr';
import io from 'socket.io-client';

class CreateItem extends Component {
  state = {
    film_name: '',
    film_description: '',
    film_director:'',
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
      name: this.state.film_name,
      description: this.state.film_description,
      director: this.state.film_director
    };
    this.socket.emit('create film', obj)
    this.setState({
      film_name: '',
      film_description: '',
      film_director:'',
      isRedirect: true
    })  
  }

  onChangeName = (e) => {
    this.setState({
      film_name: e.target.value
    });
  }

  onChangeDescription = (e) => {
    this.setState({
      film_description: e.target.value
    });
  }

  onChangeDirector = (e) => {
    this.setState({
      film_director: e.target.value
    });
  }

  render() {

    if (this.state.isRedirect) {
      return <Redirect to={'/films/'}/>
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
              value={this.state.film_name}
              maxLength="20" 
              required
              onChange={this.onChangeName}
              successMessage="Looks good!"
            />
          </div>
          <div className="form-group col-md-6">
            <label>Description</label>
            <TextInput
              rows='3' 
              type="text" 
              className="form-control" 
              name="description" 
              placeholder="description" 
              required
              multiline
              onChange={this.onChangeDescription} 
              value={this.state.film_description}
              errorMessage="Please write a description."
            />     
          </div>
          <div className="form-group col-md-6">
            <label>Director</label>
            <TextInput 
              type="text" 
              className="form-control" 
              name="director" 
              placeholder="director" 
              maxLength="20" 
              value={this.state.film_director} 
              required
              onChange={this.onChangeDirector}
              errorMessage="Please write a director."
            />  
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-info"> Submit</button>
          <Link className="btn btn-secondary" to="/films">Back</Link>
        </div>
      </ValidationForm>
    </section>
    );
  }
}
export default CreateItem;