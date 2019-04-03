import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import axios from 'axios';
import io from 'socket.io-client';
let socket = io(`http://localhost:8000`);

class SessionTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount(){
    socket.emit('get sessions');
    socket.on('session recived', (sessions) => {
      this.setState({ items: sessions });
    });

/*     let token = JSON.parse(window.localStorage.getItem('user'));
    var headers = { Authorization: token.data.token };
    axios.get(`http://localhost:8080/sessions/`, { headers: headers})
      .then(response => {
        console.log(response);
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
      console.log(this.state.items); */
  }

  tabRow = () => {
    let path  = this.props.path;
    if (this.state.items.length > 0){
      return this.state.items.map(function(object, i){
        const arr = {
          "id": object.id, 
          "cinema": object.Cinema_Id, 
          "film": object.Film_Id,
          "date": object.date
        };
        return <TableRow path={path} obj={arr} key={i} />;
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
export default SessionTable;
