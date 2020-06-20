import React from 'react';
import Tools from './Tools';
import WorkSpace from './WorkSpace';
import store from '../redux/redux-store';
import { setSelectionActionCreator } from '../redux/state-reducer';

const App = (): JSX.Element => {
  
  const clickOnScreen = (e: React.MouseEvent): void => {
    if (!e.defaultPrevented) {
      store.dispatch(setSelectionActionCreator(null));
    }
  }
  
  return (
    <div className="screen">
      <Tools />
      <div id="work_space" className="right_part" onClick={clickOnScreen}>
        <WorkSpace store={store}/>
      </div>
    </div>
  );
}

export default App;