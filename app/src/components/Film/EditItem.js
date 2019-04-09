import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation"; 

export default class EditItem extends Component {
  state = {
    film_name: '',
    film_description: '',
    film_director:'',
    isRedirect: false
  }

  componentDidMount() {
    let token = JSON.parse(window.localStorage.getItem('user'));
    var headers = { Authorization: token.data.token };
    axios.get('http://localhost:8080/films/edit/'+this.props.match.params.id, { headers: headers})
      .then(response => {
          this.setState({ 
            film_name: response.data.name,
            film_description: response.data.description,
            film_director: response.data.director
            });
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.film_name,
      description: this.state.film_description,
      director: this.state.film_director
    };
    let token = JSON.parse(window.localStorage.getItem('user'));
    var headers = { Authorization: token.data.token };
    axios.put('http://localhost:8080/films/edit/'+this.props.match.params.id, obj, { headers: headers})
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