import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import axios from 'axios';
import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';


class FilmTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    let token = JSON.parse(window.localStorage.getItem('user')).data.token;
    this.socket = io(`http://localhost:8000`,{
    query: {
        token: token,
      },
    });
  }



  componentDidMount(){
    console.log('here');
    this.socket.emit('get films');
    this.socket.on('film recived', (films) => {
      this.setState({ items: films });
    });
    this.socket.on('error', function(err){
      toastr.error(err);
     // this.setState({ isRedirect: true });
    });
  }

  tabRow = () => {
    let path  = this.props.path;
    let name  = this.props.name;
    if (this.state.items.length > 0){
      return this.state.items.map(function(object, i){
        const arr = {
          "id": object.id, 
          "name": object.name, 
          "description": object.description,
          "director": object.director
        };
        
        return <TableRow  name={name} path={path} obj={arr} key={i} />;
      })
    }
  }

  render() {
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
export default FilmTable;
