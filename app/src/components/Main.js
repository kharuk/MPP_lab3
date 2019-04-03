import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilmTable from './Film/FilmTable';
import CinemaTable from './Cinema/CinemaTable';
import SessionTable from './Session/SessionTable';
import Header from './Header';
import ReduxToastr from 'react-redux-toastr'


class Main extends Component {

  renderTable = () => {
    if (this.props.createPath === 'films'){
      return <FilmTable name={this.props.name} socket={this.props.socket} path={this.props.createPath} items={this.props.headerItems}/>
    } else if (this.props.createPath === 'cinemas'){
      return <CinemaTable name={this.props.name} socket={this.props.socket} path={this.props.createPath} items={this.props.headerItems}/>
    } else if (this.props.createPath === 'sessions'){
      return <SessionTable name={this.props.name} socket={this.props.socket} path={this.props.createPath} items={this.props.headerItems}/>
    }
  }

  render() {
    return (
      <>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      <div className="container container__margin" >
        <Header header={this.props.header}/>
        <Link to={`/${this.props.createPath}/new`} className="btn btn-success" role="button">Add</Link>
        {this.renderTable()}
      </div>
      </>
    );
  }
}
export default Main;