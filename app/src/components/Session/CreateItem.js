import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { ValidationForm, TextInput, SelectGroup} from "react-bootstrap4-form-validation";

class CreateItem extends Component {
  state = {
    session_date: '',
    session_films: [],
    session_cinemas: [],
    session_film_id: 0,
    session_cinema_id: 0,
    isRedirect: false
  }

  componentDidMount() {
    axios.get('http://localhost:8080/sessions/new/')
    .then(response => {
        this.setState({ 
          session_films: response.data.films,
          session_cinemas: response.data.cinemas,
          });
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      date: this.state.session_date,
      Film_Id: this.state.session_film_id,
      Cinema_Id: this.state.session_cinema_id
    };
    console.log(obj);
    axios.post('http://localhost:8080/sessions/new', obj)
        .then(res => console.log(res.data))
        .then(()=> {
          this.setState({
            session_date: '',
            session_films: [],
            session_cinemas:[],
            session_film_id: 0,
            session_cinema_id: 0,
            isRedirect: true
          })
        });


  }

  onChangeDate = (e) => {
    this.setState({
      session_date: e.target.value
    });
  }

  onChangeFilm = (e) => {
    this.setState({
      session_film_id: e.target.value
    });
  }

  onChangeCinema = (e) => {
    this.setState({
      session_cinema_id: e.target.value
    });
  }

  render() {

    if (this.state.isRedirect) {
      return <Redirect to={'/sessions/'}/>
    }

    return (
      <section className="container container__margin" >
        <h3>{this.props.header}</h3>
        <ValidationForm onSubmit={this.onSubmit} autoComplete="off" className="needs-validation" noValidate>
        <div>
          <div className="form-group col-md-6">
            <label htmlFor="select1">Film select</label>
            <SelectGroup
              name="Film_Id"  
              className="form-control" 
              id="select1" 
              value={this.state.session_film_id} 
              required
              onChange={this.onChangeFilm}
              errorMessage=" Please choose film."
            >
            <option value="">-- Select Film --</option>
            {
              this.state.session_films.map(function(item, i){
                return <option key={i} value={item.id}>{item.name}</option>;
            })
            }
            </SelectGroup> 
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="select2">Cinema select</label>
            <SelectGroup
              name="Cinema_Id" 
              className="form-control" 
              id="select2" 
              value={this.state.session_cinema_id} 
              required
              onChange={this.onChangeCinema}
              errorMessage="Please choose cinema."
            >
            <option value="">-- Select Cinema --</option>
            {
              this.state.session_cinemas.map(function(item, i){
                return <option key={i} value={item.id}>{item.name}</option>;
            })
            }
            </SelectGroup>
          </div>
          <div className="form-group col-md-6">
            <label>Date</label>
            <TextInput
              type="date" 
              className="form-control" 
              name="date" 
              placeholder="date" 
              maxLength="20" 
              value={this.state.session_date} 
              required
              onChange={this.onChangeDate}
              errorMessage="Please input date."
            /> 
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-info"> Submit</button>
          <Link className="btn btn-secondary" to="/sessions">Back</Link>
        </div>
      </ValidationForm>
    </section>
    );
  }
}
export default CreateItem;