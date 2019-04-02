import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation"; 
import io from 'socket.io-client';
let socket = io(`http://localhost:8000`);

export default class EditItem extends Component {
  state = {
    film_name: '',
    film_description: '',
    film_director:'',
    isRedirect: false
  }

  componentDidMount() {
      let id = this.props.match.params.id;
      socket.emit('show film', (id));

      socket.on('film shown', (film) => {
        this.setState({ 
          film_name: film.name,
          film_description: film.description,
          film_director: film.director
          });
      });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.film_name,
      description: this.state.film_description,
      director: this.state.film_director
    };
    let id = this.props.match.params.id
    console.log(id, obj);
    socket.emit('update film', id, obj);
    this.setState({ 
      isRedirect: true
    });
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