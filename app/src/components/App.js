import React, { Component} from 'react';
import Header from './Header';
import Main from './Main';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';
import info from '../data/Info'
import CreateItem from './Film/CreateItem';
import EditItem from './Film/EditItem';
import CreateItemCinema from './Cinema/CreateItem';
import EditItemCinema from './Cinema/EditItem';
import CreateItemSession from './Session/CreateItem';
import EditItemSession from './Session/EditItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: info.headerItems,
      header: info.header
    }
  }
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Header} />
          <Switch>
            <Route 
              exact path="/films" 
              render={(props) => <Main 
                {...props} 
                header={this.state.header.filmList}
                headerItems={this.state.items.filmList}
                createPath='films'
              />}/>
            <Route               
              exact path="/cinemas" 
              render={(props) => <Main 
              {...props} 
              header={this.state.header.cinemaList}
              headerItems={this.state.items.cinemaList}
              createPath='cinemas'
            />}/>
            <Route 
              exact path="/sessions" 
              render={(props) => <Main 
              {...props} 
              header={this.state.header.sessionList}
              headerItems={this.state.items.sessionList}
              createPath='sessions'
            />}/>
            <Route
              exact path={`/films/new`} 
              component={CreateItem}
            />
            <Route
              exact path={`/films/:id/edit`} 
              component={EditItem}
            />
            <Route
              exact path={`/cinemas/new`} 
              component={CreateItemCinema}
            />
            <Route
              exact path={`/cinemas/:id/edit`} 
              component={EditItemCinema}
            />
            <Route
              exact path={`/sessions/new`} 
              component={CreateItemSession}
            />
            <Route
              exact path={`/sessions/:id/edit`} 
              component={EditItemSession}
            />
          </Switch>
        </div>
      </Router>
        );
  }
}
//   <Container items={this.state.items} header={this.state.header}/>
export default App;
