import React, { Component } from 'react';
import Item from './Item';
import { Link, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';
import api from '../api/api';


class Table extends Component {


  state = {
    isRedirect: false
  }
  delete = () => {
    let id = this.props.obj.id;
    let name = this.props.name
    console.log(name);
    if (name === 'film') {
      api
      .deleteFilm(id)
      .then(() => {
        this.setState({ 
          isRedirect: true
        });
      })
      .catch((err) => console.log(err)); 
    } else if (name === 'session') {
      api
      .deleteSession(id)
      .then(() => {
        this.setState({ 
          isRedirect: true
        });
      })
      .catch((err) => console.log(err)); 
    } else if (name === 'cinema') {
      api
      .deleteCinema(id)
      .then(() => {
        this.setState({ 
          isRedirect: true
        });
      })
      .catch((err) => console.log(err)); 
    }


  }

  render() {
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
