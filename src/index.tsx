import ReactDOM from 'react-dom';
import './style.css';
import React from 'react';
import store from './redux/redux-store';
import StoreContext from './components/StoreContext';
import App from './components/App';

let rerenderEntireTree = (): void => {
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      < App store={store}/>
    </StoreContext.Provider>, document.getElementById("root"));
};

rerenderEntireTree();

store.subscribe(() => {
  rerenderEntireTree();
});