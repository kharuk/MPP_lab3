import React, { Component } from 'react';
import Item from './Item';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';
let token = JSON.parse(window.localStorage.getItem('user')).data.token;
let socket = io(`http://localhost:8000`,{
  query: {
    token: token,
  },
});

class Table extends Component {

  constructor(props){
    super(props);
    let token = JSON.parse(window.localStorage.getItem('user')).data.token;
    this.socket = io(`http://localhost:8000`,{
        query: {
            token: token,
          },
        });
  }

  state = {
    isRedirect: false
  }



  delete = () => {
    let id = this.props.obj.id;
    let name = this.props.name
    console.log(name);
    this.socket.emit(`delete ${name}`, (id));
    this.setState({ 
      isRedirect: true
    });

  }

  render() {
    this.socket.on('error', function(err){
      toastr.error(err);
    });
    if (this.state.isRedirect) {
      return <Redirect to={`/${this.props.path}/`}/>
    }

    return (
      <tr>
        {
          Object.values(this.props.obj).map((item, i) => <Item key={i} item={item} />)
        }
        <td>
          <Link to={`/${this.props.path}/${this.props.obj.id}/edit`} className="btn btn-sm btn-info edit" role="button">Edit</Link>
          <button  onClick={this.delete} className="btn btn-sm btn-danger delete" >Delete</button>
        </td>
      </tr>
    );
  }
}
export default Table;
