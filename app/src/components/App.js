import React, { Component} from 'react';
import Header from './Header';
import Main from './Main';
import {Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';
import info from '../data/Info'
import CreateItem from './Film/CreateItem';
import EditItem from './Film/EditItem';
import CreateItemCinema from './Cinema/CreateItem';
import EditItemCinema from './Cinema/EditItem';
import CreateItemSession from './Session/CreateItem';
import EditItemSession from './Session/EditItem';
import { history } from '../helpers';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRouter';
import { alertActions } from '../actions';
import  Login  from './Authentication/Login';
import io from 'socket.io-client';
let socket = io(`http://localhost:8000`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: info.headerItems,
      header: info.header
    }

    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());
    });
  }
  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={Header} />
           {alert.message &&
              <div className={`alert ${alert.type} container container__margin`}>{alert.message.response.data.message}</div>
            }
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute 
              exact path="/films" 
              name='film'
              component={Main}
              header={this.state.header.filmList}
              headerItems={this.state.items.filmList}
              createPath='films'
              socket={socket}
              /* render={(props) => <Main 
                {...props} 
                header={this.state.header.filmList}
                headerItems={this.state.items.filmList}
                createPath='films'
              />} *//>
            <PrivateRoute               
              exact path="/cinemas"
              component={Main} 
              name='cinema'
              header={this.state.header.cinemaList}
              headerItems={this.state.items.cinemaList}
              createPath='cinemas'
              socket={socket}
            />
            <PrivateRoute 
              exact path="/sessions" 
              component={Main}
              name='session'
              header={this.state.header.sessionList}
              headerItems={this.state.items.sessionList}
              createPath='sessions'
              socket={socket}
            />
            <PrivateRoute
              exact path={`/films/new`} 
              component={CreateItem}
              socket={socket}
            />
            <PrivateRoute
              exact path={`/films/:id/edit`} 
              component={EditItem}
              socket={socket}
            />
            <PrivateRoute
              exact path={`/cinemas/new`} 
              component={CreateItemCinema}
              socket={socket}
            />
            <PrivateRoute
              exact path={`/cinemas/:id/edit`} 
              component={EditItemCinema}
              socket={socket}
            />
            <PrivateRoute
              exact path={`/sessions/new`} 
              component={CreateItemSession}
              socket={socket}
            />
            <PrivateRoute
              exact path={`/sessions/:id/edit`} 
              component={EditItemSession}
              socket={socket}
            />
          </Switch>
        </div>
      </Router>
        );
  }
}
//   <Container items={this.state.items} header={this.state.header}/>
function mapStateToProps(state) {
  const { alert } = state;
  console.log(alert);
  return {
      alert
  };
}

export default App = connect(mapStateToProps)(App);
