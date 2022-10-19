import React from 'react';
import {Provider} from 'react-redux';
import MainPage from './src/pages/MainPage';
import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainPage />
      </PersistGate>
    </Provider>
  );
}

export default App;
