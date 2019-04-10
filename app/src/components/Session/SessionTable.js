import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router'
import api from '../../api/api';



class SessionTable extends Component {
  state = {
    items: [],
    isRedirect: false
  };

  componentDidMount(){
    api
      .fetchSessions()
      .then((res) => {
        const sessions = res.getSessions;
        this.setState({ items: sessions });
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
          "cinema": object.Cinema_Id, 
          "film": object.Film_Id,
          "date": object.date
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
      <React.Fragment>
        <table className="table table-striped">
          <TableHeader items={this.props.items}/>
          <tbody>
            { this.tabRow()}
          </tbody>
        </table>
      {/*   } */}
      </React.Fragment>
    );
  }
}
export default withRouter(SessionTable);
