import ReactDOM from 'react-dom';
import './style.css';
import React, {} from 'react';
import Screen from './components/Screen';
import store from './redux/state';

let rerenderEntireTree = (state: any): any => {
  debugger
  ReactDOM.render(
    < Screen
      state={state}
      dispatch={store.dispatch.bind(store)}
    />, document.getElementById("root"));
};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);