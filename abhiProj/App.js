import React from 'react';
import {Provider} from 'react-redux';
import MainPage from './src/pages/MainPage';
import store from './src/redux/store';


function App() {

  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
