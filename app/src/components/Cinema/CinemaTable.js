import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router';
import api from '../../api/api';

class CinemaTable extends Component {

  state = {
    items: []
  };

  componentDidMount(){
    api
      .fetchCinemas()
      .then((res) => {
        const cinemas = res.getCinemas;
        this.setState({ items: cinemas });
      })
      .catch((err) => {
        console.log(err);

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
