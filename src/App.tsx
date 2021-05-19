import React from 'react';
import Game from './containers/Game';
import { Provider } from 'react-redux'
import { store } from './store'

//  <Game></Game>
function App() {
  return (<Provider store={store}>
    <Game {...{}}></Game>
  </Provider>);
}

export default App;
