import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';
import { ValidationForm, TextInput, SelectGroup} from "react-bootstrap4-form-validation";
import api from '../../api/api';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router'

class EditItem extends Component {

  state = {
    session_date: '',
    session_films: [],
    session_cinemas: [],
    session_film_id: 0,
    session_cinema_id: 0,
    isRedirect: false
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    api
    .fetchSession(id)
    .then((res) => {
      console.log(res);
      this.setState({ 
        session_date: res.showSession.session.date,
        session_film_id: res.showSession.session.Film_Id,
        session_cinema_id: res.showSession.session.Cinema_Id,
        session_films: res.showSession.films,
        session_cinemas: res.showSession.cinemas,
        });
    })
    .catch((err) => {
      console.log(err);
     // this.setState({ isRedirect: true });
    });  
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      date: this.state.session_date,
      Film_Id: +this.state.session_film_id,
      Cinema_Id: +this.state.session_cinema_id
    };
    let id = this.props.match.params.id

    api
      .editSession(id, obj)
      .then((res) => {
        this.setState({ 
          isRedirect: true
        });
      })
      .catch((err) => console.log(err)); 
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


  delayRedirect = event => {
    const { history: { push } } = this.props;
    setTimeout(()=>push('/login/'), 3000);
  }


  render() {
    if (this.state.isFalseLogin) {
      //return <Redirect to={'/login/'}/>
      this.delayRedirect();
    }  

    if (this.state.isRedirect) {
      return <Redirect to={'/sessions'}/>
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

export default withRouter(EditItem);