import React from 'react';
import Landing from './screens/Landing';
import {MyRoot} from './components/MyRoot';
import {Provider} from 'react-redux';
import store from './redux/store';


export default () => {
  return (
    <Provider store={store}>
      <MyRoot>
        <Landing />
      </MyRoot>
    </Provider>
  );
};
