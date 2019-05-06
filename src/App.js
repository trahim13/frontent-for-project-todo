import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddProject from "./components/Project/AddProject";
import {Provider} from 'react-redux';
import store from './store.js';
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTask/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";
import setJwtTokenToHeader from "./securityUtils/setJwtToken";
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityAction";
import SecuredRoute from "./securityUtils/SecureRoute"


const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJwtTokenToHeader(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  })


  const curentTime = new Date()/1000;

    if(decoded_jwtToken.exp < curentTime){
      
      store.dispatch(logout())

      window.location.href="/";
      
    }
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          
              <Header />

              <Route exact path="/" component={Landing}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>

            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard}/>
              <SecuredRoute exact path="/addProject" component={AddProject}/>
              <SecuredRoute exact path="/updateProject/:projectIdentifier" component={UpdateProject}/>
              <SecuredRoute exact path="/projectBoard/:projectIdentifier" component={ProjectBoard}/>
              <SecuredRoute exact path="/addProjectTask/:projectIdentifier" component={AddProjectTask}/>
              <SecuredRoute exact path="/updateProjectTask/:projectIdentifier/:projectSequence" component={UpdateProjectTask}/>
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;