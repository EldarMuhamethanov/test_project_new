import React from 'react'
import { changeShapesActionCreator, changeSelectActionCreator } from '../redux/workspace-reducer';
import { switchDisableFillColorPickerActionCreator, switchDisableStrokeColorPickerActionCreator, changeFillColorPickerColorActionCreator, changeStrokeColorPickerColorActionCreator } from '../redux/toolbar-reducer';
import OneShape from './OneShape';

const OneShapeContainer = (props: any): any => {

  let state = props.store.getState().workSpace;
  
  const changeShapes = (newShapes: any) => {
    props.store.dispatch(changeShapesActionCreator(newShapes, newShapes.length));
  }
  const changeSelect = (indexShape: any) => {
    props.store.dispatch(changeSelectActionCreator(indexShape))
  }
  const switchDisableFillColorPicker = (isDisabled: any) => {
    props.store.dispatch(switchDisableFillColorPickerActionCreator(isDisabled));
  }
  const switchDisableStrokeColorPicker = (isDisabled: any) => {
    props.store.dispatch(switchDisableStrokeColorPickerActionCreator(isDisabled));
  }
  const changeFillColorPickerColor = (newColor: any) => {
    props.store.dispatch(changeFillColorPickerColorActionCreator(newColor))
  }
  const changeStrokeColorPickerColor = (newColor: any) => {
    props.store.dispatch(changeStrokeColorPickerColorActionCreator(newColor))
  }

  return( 
    <OneShape
      changeShapes={changeShapes}
      changeSelect={changeSelect}
      switchDisableFillColorPicker={switchDisableFillColorPicker}
      switchDisableStrokeColorPicker={switchDisableStrokeColorPicker}
      changeFillColorPickerColor={changeFillColorPickerColor}
      changeStrokeColorPickerColor={changeStrokeColorPickerColor}
      shapes={state.shapes}
      index={props.index} />
  )
}

export default OneShapeContainer; 