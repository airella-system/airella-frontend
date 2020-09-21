import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainView from "./views/main/MainView";
import SubpageView from "./views/subpage/SubpageView";
import ActivationView from "./views/activateAccount/ActivationView";
import UserView from "./views/user/UserView";
import Login from "./components/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Login />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return <MainView />;
            }}
          />
          <Route
            exact
            path="/subpage"
            render={(props) => {
              return <SubpageView />;
            }}
          />
          <Route
            exact
            path="/activateAccount/:email/:activationCode"
            render={(props) => {
              return <ActivationView {...props} />;
            }}
          />
          <Route
            exact
            path="/user"
            render={(props) => {
              return <UserView {...props} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
