import React from 'react'
import { changeShapesActionCreator, changeSelectActionCreator } from '../redux/workspace-reducer';
import { switchDisableFillColorPickerActionCreator, switchDisableStrokeColorPickerActionCreator, changeFillColorPickerColorActionCreator, changeStrokeColorPickerColorActionCreator } from '../redux/toolbar-reducer';
import OneShape from './OneShape';
import { ShapesType } from '../types';
import StoreContext from './StoreContext';

const OneShapeContainer = (props: any): JSX.Element => {
  return (
    <StoreContext.Consumer>
      {
        (store: any) => {
          let state = store.getState().workSpace;
  
          const changeShapes = (newShapes: Array<ShapesType>): void => {
            store.dispatch(changeShapesActionCreator(newShapes, newShapes.length));
          }
          const changeSelect = (indexShape: number): void => {
            store.dispatch(changeSelectActionCreator(indexShape))
          }
          const switchDisableFillColorPicker = (isDisabled: boolean): void => {
            store.dispatch(switchDisableFillColorPickerActionCreator(isDisabled));
          }
          const switchDisableStrokeColorPicker = (isDisabled: boolean): void => {
            store.dispatch(switchDisableStrokeColorPickerActionCreator(isDisabled));
          }
          const changeFillColorPickerColor = (newColor: string): void => {
            store.dispatch(changeFillColorPickerColorActionCreator(newColor))
          }
          const changeStrokeColorPickerColor = (newColor: string): void => {
            store.dispatch(changeStrokeColorPickerColorActionCreator(newColor))
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
      }
    </StoreContext.Consumer>
  )
}


export default OneShapeContainer; 