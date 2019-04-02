import React, { Component } from 'react';
import Item from './Item';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
let socket = io(`http://localhost:8000`);


class Table extends Component {

  state = {
    isRedirect: false
  }

  delete = () => {
    let id = this.props.obj.id;
    let name = this.props.name
    socket.emit(`delete ${name}`, (id));
    this.setState({ 
      isRedirect: true
    });
  }

  render() {
  //  console.log(this.props.items);

  
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
