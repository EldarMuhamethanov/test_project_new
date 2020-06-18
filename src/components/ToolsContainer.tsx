import React from 'react';
import { ShapesType } from '../types';
import { changeShapesActionCreator } from '../redux/workspace-reducer';
import { changeStrokeColorPickerColorActionCreator, changeFillColorPickerColorActionCreator } from '../redux/toolbar-reducer';
import Tools from './Tools';
import StoreContext from './StoreContext';

type PropsType = {
  toolbarState: any, 
  countShapes: number
  shapes: Array<ShapesType>
  selectedShape: number | null
  dispatch: any
}

const ToolsContainer = (): JSX.Element => {

  return (
    <StoreContext.Consumer>
      {
        (store: any) => {
          let workSpaceState = store.getState().workSpace;
          let toolbarState = store.getState().toolbar;
          
          const changeShapes = (newShapes: Array<ShapesType>): void => {
            store.dispatch(changeShapesActionCreator(newShapes, newShapes.length));
          }
          const changeFillColorPickerColor = (newColor: string): void => {
            store.dispatch(changeFillColorPickerColorActionCreator(newColor))
          }
          const changeStrokeColorPickerColor = (newColor: string): void => {
            store.dispatch(changeStrokeColorPickerColorActionCreator(newColor))
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
      }
    </StoreContext.Consumer>
  )
}

export default ToolsContainer;