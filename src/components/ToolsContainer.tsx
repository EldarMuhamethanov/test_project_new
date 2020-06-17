import React from 'react';
import { ShapesType } from '../types';
import { changeShapesActionCreator } from '../redux/workspace-reducer';
import { changeStrokeColorPickerColorActionCreator, changeFillColorPickerColorActionCreator } from '../redux/toolbar-reducer';
import Tools from './Tools';

type PropsType = {
  toolbarState: any, 
  countShapes: number
  shapes: Array<ShapesType>
  selectedShape: number | null
  dispatch: any
}

const ToolsContainer = (props: any): any => {

  let workSpaceState = props.store.getState().workSpace;
  let toolbarState = props.store.getState().toolbar;
  
  const changeShapes = (newShapes: any) => {
    props.store.dispatch(changeShapesActionCreator(newShapes, newShapes.length));
  }
  const changeFillColorPickerColor = (newColor: any) => {
    props.store.dispatch(changeFillColorPickerColorActionCreator(newColor))
  }
  const changeStrokeColorPickerColor = (newColor: any) => {
    props.store.dispatch(changeStrokeColorPickerColorActionCreator(newColor))
  }
  
  return (
    <Tools
      changeShapes={changeShapes}
      changeFillColorPickerColor={changeFillColorPickerColor}
      changeStrokeColorPickerColor={changeStrokeColorPickerColor}
      selectedShape={workSpaceState.selectedShape}
      shapes={workSpaceState.shapes}
      isDisableFillColorPicker={toolbarState.isDisableFillColorPicker}
      isDisableStrokeColorPicker={toolbarState.isDisableStrokeColorPicker}
      fillColorPickerColor={toolbarState.fillColorPickerColor}
      strokeColorPickerColor={toolbarState.strokeColorPickerColor}
    />
  )
}

export default ToolsContainer;