import React from 'react';
import WorkSpaceContainer from './WorkSpaceContainer';
import ToolsContainer from './ToolsContainer';

// type PropsType = {
//   store: StoreType
// }

const Screen = (): JSX.Element=> {
  return (
    <div className="screen">
      <ToolsContainer />
      <WorkSpaceContainer/>
    </div>
  );
}

export default Screen;