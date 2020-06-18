import ReactDOM from 'react-dom';
import './style.css';
import React from 'react';
import Screen from './components/Screen';
import store from './redux/redux-store';
import StoreContext from './components/StoreContext';



let rerenderEntireTree = (): void => {
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      < Screen />
    </StoreContext.Provider>, document.getElementById("root"));
};

rerenderEntireTree();

store.subscribe(() => {
  rerenderEntireTree();
});