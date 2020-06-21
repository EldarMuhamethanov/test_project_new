import React from 'react';
import Tools from './Tools';
import WorkSpace from './WorkSpace';
import store from '../redux/redux-store';

const App = (props: any): JSX.Element => {
  
  return (
    <div className="screen">
      <Tools />
      <WorkSpace store={props.store} />
    </div>
  );
}

export default App;