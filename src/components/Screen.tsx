import React from 'react';
import { StoreStateType } from '../types';
import WorkSpaceContainer from './WorkSpaceContainer';
import ToolsContainer from './ToolsContainer';

type PropsType = {
  state: StoreStateType,
  dispatch: any,
}

const Screen = (props: any) => {
  return (
    <div className="screen">
      <ToolsContainer 
        store={props.store}
      />
      <WorkSpaceContainer
        store={props.store}
      />
    </div>
  );
}

export default Screen;