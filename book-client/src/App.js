import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Menu from './pages/Menu'
import Page from './pages/Page'
import Index from './pages/Index'

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
           
            <Route exact path="/" component={Index} />
            <Route path="/search/:origin/:book" component={Index} />
            <Route  path="/menu/:origin/:book" component={Menu} />
            <Route  path="/detail/:origin/:book" component={Page} />
          </div>
      </Router>
    );
  }
}

export default App;
