import React, {useState} from 'react';
import Tools from './Tools';
import WorkSpace from './WorkSpace';
import { ShapesType, StoreStateType } from '../types';

type PropsType = {
  state: StoreStateType,
  dispatch: any,
}

const Screen = (props: PropsType) => {
  return (
    <div className="screen">
      <Tools 
        toolbarState={props.state.toolbar}
        countShapes={props.state.workSpace.count}
        shapes={props.state.workSpace.shapes}
        dispatch={props.dispatch}
        selectedShape={props.state.workSpace.selectedShape}
      />
      <WorkSpace 
        countShapes={props.state.workSpace.count}
        shapes={props.state.workSpace.shapes}
        selectedShape={props.state.workSpace.selectedShape}
        dispatch={props.dispatch}
      />
    </div>
  );
}

export default Screen;