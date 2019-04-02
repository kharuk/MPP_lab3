import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import axios from 'axios';
import io from 'socket.io-client';

let socket = io(`http://localhost:8000`);

class FilmTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }



  componentDidMount(){
  //  let token = JSON.parse(window.localStorage.getItem('user'));
/*     let t = this.getCookie('token');
    console.log('qwerty', t); */
  //  var headers = { Authorization: token.data.token };
    console.log('here');
    socket.emit('get films');
    socket.on('film recived', (films) => {
      this.setState({ items: films });
    });
   /*  axios.get('http://localhost:8080/films', { headers: headers})
      .then(response => {
        console.log(response);
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      }) */
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
