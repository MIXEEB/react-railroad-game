import React from 'react';
import Tilemap from './containers/Tilemap';
import { Provider } from 'react-redux'
import { store } from './store/store'



function App() {
  return (<Provider store={store}>
    <Tilemap {...{}}></Tilemap>
  </Provider>);
}

export default App;
