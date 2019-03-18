import React, { Component } from 'react';
import Item from './Item';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Table extends Component {

  state = {
    isRedirect: false
  }

  delete = () => {
    axios.delete(`http://localhost:8080/${this.props.path}/delete/${this.props.obj.id}`)
      .then(console.log('Deleted'))
      .then(()=> {
        this.setState({ 
          isRedirect: true
        });
      })
     // .then(axios.get(`http://localhost:8080/${this.props.path}`))
      .catch(err => console.log(err))
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
