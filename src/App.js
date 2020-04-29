import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainView from './views/main/MainView';
import VersionInfo from './components/VersionInfo';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="mainLayout">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ (props) => { return <MainView /> } } />
          </Switch>
        </BrowserRouter>
        <VersionInfo/>
      </div>
    );  
  }        
}

export default App;