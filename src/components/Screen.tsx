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
        countShapes={props.state.count}
        shapes={props.state.shapes}
        dispatch={props.dispatch}
        selectedShape={props.state.selectedShape}
      />
      <WorkSpace 
        countShapes={props.state.count}
        shapes={props.state.shapes}
        selectedShape={props.state.selectedShape}
        dispatch={props.dispatch}
      />
    </div>
  );
}

export default Screen;