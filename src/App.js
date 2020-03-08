import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./redux/store";
import MainMenu from "./components/main-menu";
import TeasersList from "./components/teasers-list";
import Show from "./components/show";
import Episode from "./components/episode";

import "./App.scss";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainMenu />
        <main className="content">
          <Switch>
            <Route path="/favorite-tv-shows" exact component={TeasersList} />
            <Route path="/shows/:id" exact component={Show} />
            <Route path="/episode/:id" exact component={Episode} />
            <Redirect from="/" to="/favorite-tv-shows" />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
