import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router'
let socket = io(`http://localhost:8000`);

class CinemaTable extends Component {

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
    this.socket.emit('get cinemas');
    this.socket.on('cinema recived', (cinemas) => {
      this.setState({ items: cinemas });
    });
    this.socket.on('error', (err)=> {
      toastr.error(err);
      this.setState({ isRedirect: true });
    });
  }

  tabRow = () => {
    let path  = this.props.path;
    let name = this.props.name;
    if (this.state.items.length > 0){
      return this.state.items.map(function(object, i){
        const arr = {
          "id": object.id, 
          "name": object.name, 
          "phone": object.phone,
          "address": object.address
        };
        return <TableRow name={name} path={path} obj={arr} key={i} />;
      })
    }
  }

    delayRedirect = event => {
      const { history: { push } } = this.props;
    // event.preventDefault();
      setTimeout(()=>push('/login/'), 3000);
    }


    render() {
      if (this.state.isRedirect) {
        //return <Redirect to={'/login/'}/>
        this.delayRedirect();
    } 
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
export default withRouter(CinemaTable);
