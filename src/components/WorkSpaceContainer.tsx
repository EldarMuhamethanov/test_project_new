import React from 'react';
import { changeShapesActionCreator, dischargeSelectActionCreator } from '../redux/workspace-reducer';
import { switchDisableFillColorPickerActionCreator, switchDisableStrokeColorPickerActionCreator } from '../redux/toolbar-reducer';
import WorkSpace from './WorkSpace';
import { ShapesType } from '../types';
import StoreContext from './StoreContext';


const WorkSpaceContainer = (): any => {
  return (
    <StoreContext.Consumer >
      {
        (store: any) => {
          let state = store.getState().workSpace;
  
          const changeShapes = (newShapes: Array<ShapesType>): void => {
            store.dispatch(changeShapesActionCreator(newShapes, newShapes.length));
          }
          const dischargeSelect = (): void => {
            store.dispatch(dischargeSelectActionCreator());
          }
          const switchDisableFillColorPicker = (isDisabled: boolean): void => {
            store.dispatch(switchDisableFillColorPickerActionCreator(isDisabled));
          }
          const switchDisableStrokeColorPicker = (isDisabled: boolean): void => {
            store.dispatch(switchDisableStrokeColorPickerActionCreator(isDisabled));
          }
          return <WorkSpace
          changeShapes={changeShapes}
          dischargeSelect={dischargeSelect}
          switchDisableFillColorPicker={switchDisableFillColorPicker}
          switchDisableStrokeColorPicker={switchDisableStrokeColorPicker}
          selectedShape={state.selectedShape}
          shapes={state.shapes}
          store={store}/>
        }

      }
    </StoreContext.Consumer>
    
  )
}

export default WorkSpaceContainer;