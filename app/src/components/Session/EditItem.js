import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';
import { ValidationForm, TextInput, SelectGroup} from "react-bootstrap4-form-validation";
import io from 'socket.io-client';
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
    let id = this.props.match.params.id;
    this.socket.emit('show session', (id));

    this.socket.on('session shown', (session) => {
      this.setState({ 
        session_date: session.session.date,
        session_film_id: session.session.Film_Id,
        session_cinema_id: session.session.Cinema_Id,
        session_films: session.films,
        session_cinemas: session.cinemas,
        });
    });
    this.socket.on('error', (err) => {
      toastr.error(err);
      this.setState({ isRedirect: true });
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      date: this.state.session_date,
      Film_Id: this.state.session_film_id,
      Cinema_Id: this.state.session_cinema_id
    };
    let id = this.props.match.params.id
    console.log(id, obj);
    this.socket.emit('update session', id, obj);
    this.setState({ 
      isRedirect: true
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