import React, { Component } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import axios from 'axios';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      path: this.props.path
    };

  }

  componentDidMount(){
    console.log('here');
    axios.get(`http://localhost:8080/${this.props.path}`)
      .then(response => {
        console.log(response);
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  tabRow = () => {
  /*  console.log(this.props.path);
    if (this.props.path === 'films') {
      return this.state.items.map(function(object, i){
        const arr = {
          "id": object.id, 
          "name": object.name, 
          "description": object.description,
          "director": object.director
        }
        return <TableRow path={this.props.path} obj={arr} key={i} />;
    })} else if (this.props.path === 'cinemas') {
      return this.state.items.map(function(object, i){
        const arr = {
          "id": object.id, 
          "name": object.name, 
          "phone": object.phone,
          "address": object.address
        }
        return <TableRow path={this.props.path} obj={arr} key={i} />;
    })} else if (this.props.path === 'sessions') {
      return this.state.items.map(function(object, i){
        const arr = {
          "id": object.id, 
          "cinema": object.Cinema_Id, 
          "film": object.Film_Id,
          "date": object.date
        }
        return <TableRow path={this.props.path} obj={arr} key={i} />;
    })}*/
    
   /* }
       axios.get(`http://localhost:8080/films`)
      .then(response => {
        console.log(response);
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
      
   */ 
  let path = this.state.path;

  return this.state.items.map(function(object, i){
        return <TableRow path={path} obj={object} key={i} />;
    });
  }

  render() {
  //  console.log(this.props.items);
    return (
      <table className="table table-striped">
        <TableHeader items={this.props.items}/>
        <tbody>
          { this.tabRow()}
        </tbody>
      </table>
    );
  }
}
export default Table;
