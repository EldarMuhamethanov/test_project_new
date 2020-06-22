import React from 'react';
import Tools from './Tools';
import WorkSpace from './WorkSpace';
import store from '../redux/redux-store';

const App = (): JSX.Element => {
  
  return (
    <div className="screen">
      <Tools />
      <WorkSpace />
    </div>
  );
}

export default App;