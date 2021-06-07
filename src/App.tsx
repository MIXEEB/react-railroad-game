import React from 'react';
import Game from './containers/Game';
import { Provider } from 'react-redux'
import { store } from './store'
import { Switch, Route, Router } from 'react-router-dom'
import Landing from './containers/Landing';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory()
//  <Game></Game>
function App() {
  return (<Provider store={store}>
    <Router history = {browserHistory}>
      <Switch>
        <Route path="/game">
          <Game {...{}}></Game>
        </Route>
        <Route path="/">
          <Landing></Landing>
        </Route>     
      </Switch>
    </Router>
  </Provider>);
}

export default App;
