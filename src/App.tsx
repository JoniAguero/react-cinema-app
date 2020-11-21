import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import Header from './components/header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
      </div>
    </Provider>
  );
}

export default App;
