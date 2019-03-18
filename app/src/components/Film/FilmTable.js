import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import axios from 'axios';

class FilmTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount(){
    console.log('here');
    axios.get(`http://localhost:8080/films`)
      .then(response => {
        console.log(response);
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  tabRow = () => {
    let path  = this.props.path;
    if (this.state.items.length > 0){
      return this.state.items.map(function(object, i){
        const arr = {
          "id": object.id, 
          "name": object.name, 
          "description": object.description,
          "director": object.director
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
export default FilmTable;
