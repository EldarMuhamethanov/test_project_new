import ReactDOM from 'react-dom';
import './style.css';
import React, {} from 'react';
import Screen from './components/Screen';
import store from './redux/state';
import { StoreStateType, ShapesType } from './types';

let rerenderEntireTree = (state: any): any => {
  debugger
  ReactDOM.render(
    < Screen
      state={state}
      changeShapes={store.changeShapes.bind(store)}
      changeSelect={store.changeSelect.bind(store)}
      dischargeSelect={store.dischargeSelect.bind(store)}/>, document.getElementById("root"));
};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);