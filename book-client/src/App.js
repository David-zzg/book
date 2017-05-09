import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Label from './elements/Label'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Main from './pages/Main'
import Page from './pages/Page'

/*const Main = ()=>{
  return (
  <div>
    测试
     <Label labelName="测试" str="文本"></Label>
  </div>
  )
}*/


class App extends Component {
  render() {
    return (
      <Router>
          <div>
           
            <Route exact path="/" component={Main} />
            <Route  path="/menu/:book" component={Main} />
            <Route  path="/detail/:book" component={Page} />
          </div>
      </Router>
    );
  }
}

export default App;
