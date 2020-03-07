import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainView from './views/main/MainView';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => { return <MainView /> } } />
        </Switch>
      </BrowserRouter>
    );  
  }        
}

export default App;