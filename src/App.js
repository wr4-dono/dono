import React from 'react';
import Header from './Components/Header/Header'
import routes from './routes'
import './App.css';
import {withRouter} from 'react-router-dom'

function App(props) {
  return (
    <div className="App">
    {props.location.pathname === '/' ? null : <Header/>}
    {routes}
      
    </div>
  );
}


export default withRouter(App);
