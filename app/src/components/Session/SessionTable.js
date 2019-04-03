import React, { Component } from 'react';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router'
let socket = io(`http://localhost:8000`);


class SessionTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isRedirect: false
    };
  }

  componentDidMount(){
    let token = JSON.parse(window.localStorage.getItem('user')).data.token;
    //console.log(token);
    socket.emit('get sessions', token);
    socket.on('session recived', (sessions) => {
      this.setState({ items: sessions });
    });
    socket.on('unauthorized', (data) => {
      console.log(data.message);
      toastr.error(data.message);
      this.setState({
       // message: data.message,
        isRedirect: true
      })
    });
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
{/*         {this.state.message 
        ?
        <>
          {this.state.message && 
          <p 
            className={{
              backgroudColor
            }}>
            {this.state.message}
          </p>}
        </>
        : */}
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
