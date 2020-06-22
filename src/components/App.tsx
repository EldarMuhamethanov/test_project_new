import React from 'react';
import Tools from './Tools';
import WorkSpace from './WorkSpace';

const App = (): JSX.Element => {
  
  return (
    <div className="screen">
      <Tools />
      <WorkSpace />
    </div>
  );
}

export default App;