import ReactDOM from 'react-dom';
import './style.css';
//import '.fonts/Roboto-Regular.ttf'
import React from 'react';
import Screen from './components/Screen';
import store from './redux/redux-store';

let rerenderEntireTree = (state?: any): any => {
  ReactDOM.render(
    < Screen
      state={state}
      dispatch={store.dispatch.bind(store)}
    />, document.getElementById("root"));
};

rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});