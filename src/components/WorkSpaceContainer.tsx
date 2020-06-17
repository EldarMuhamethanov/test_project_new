import React from 'react';
import { changeShapesActionCreator, dischargeSelectActionCreator } from '../redux/workspace-reducer';
import { switchDisableFillColorPickerActionCreator, switchDisableStrokeColorPickerActionCreator } from '../redux/toolbar-reducer';
import WorkSpace from './WorkSpace';


const WorkSpaceContainer = (props: any): any => {

  let state = props.store.getState().workSpace;
  
  const changeShapes = (newShapes: any) => {
    props.store.dispatch(changeShapesActionCreator(newShapes, newShapes.length));
  }
  const dischargeSelect = () => {
    props.store.dispatch(dischargeSelectActionCreator());
  }
  const switchDisableFillColorPicker = (isDisabled: any) => {
    props.store.dispatch(switchDisableFillColorPickerActionCreator(isDisabled));
  }
  const switchDisableStrokeColorPicker = (isDisabled: any) => {
    props.store.dispatch(switchDisableStrokeColorPickerActionCreator(isDisabled));
  }
  return (
    <WorkSpace
      changeShapes={changeShapes}
      dischargeSelect={dischargeSelect}
      switchDisableFillColorPicker={switchDisableFillColorPicker}
      switchDisableStrokeColorPicker={switchDisableStrokeColorPicker}
      selectedShape={state.selectedShape}
      shapes={state.shapes}
      store={props.store}/>
  )
}

export default WorkSpaceContainer;