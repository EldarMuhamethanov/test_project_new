import React, { useState } from 'react';
import { ShapesType, StoreType, StoreStateType, DispatchActionType } from '../types';
import workspaceReducer from './workspace-reducer';
import toolbarReducer from './toolbar-reducer';
debugger

const CHANGE_SHAPES = 'CHANGE-SHAPES';
const CHANGE_SELECT = 'CHANGE-SELECT';
const DISCHARGE_SELECT = 'DISCHARGE-SELECT';
const CHANGE_FILL_COLORPICKER_COLOR = 'CHANGE-FILL-COLORPICKER-COLOR';
const CHANGE_STROKE_COLORPICKER_COLOR = 'CHANGE-STROKE-COLORPICKER-COLOR'; 
const SWITCH_DISABLE_FILL_COLORPICKER = 'SWITCH-DISABLE-FILL-COLORPICKER';
const SWITCH_DISABLE_STROKE_COLORPICKER = 'SWITCH-DISABLE-STROKE-COLORPICKER';

let store: StoreType = {
  _state: {
    workSpace: {
      count: 0,
      shapes: [],
      selectedShape: null,
      isAnySelect: false,
    },
    toolbar: {
      fillColorPickerColor: "#00000",
      isDisableFillColorPicker: true,
      strokeColorPickerColor: "#000000",
      isDisableStrokeColorPicker: true,
    }
  },
  getState(): StoreStateType {
    return this._state
  },
  _callSubscriber(state: any): void {
    console.log("update");
  },
  subscribe(observer: any): void {
    this._callSubscriber = observer;
  },
  _changeShapes(newShapes: Array<ShapesType>, count: number): void {
    debugger
    this._state.workSpace.shapes = newShapes;
    this._state.workSpace.count = count;
    this._callSubscriber(this._state)
  },
  _dischargeSelect(): void {
    let newShapes : Array<ShapesType> = this._state.workSpace.shapes.slice();
    newShapes = newShapes.map((row, index): ShapesType => {
      return {
        left: row.left,
        top: row.top,
        isSelected: false,
        type: row.type,
        bgcolor: row.bgcolor,
        stroke: row.stroke,
        width: row.width,
        height: row.height,
      }
    })
    this._state.workSpace.shapes = newShapes;
    this._state.workSpace.selectedShape = null;
    this._callSubscriber(this._state)
  },
  _changeSelect(indexShape: number): void {
    let newShapes : Array<ShapesType> = this._state.workSpace.shapes.slice();
    newShapes = newShapes.map((row, index): ShapesType => {
      if (index === indexShape) {
        this._state.workSpace.selectedShape = index;
        return(
          {
            left: row.left,
            top: row.top,
            isSelected: true,
            type: row.type,
            bgcolor: row.bgcolor,
            stroke: row.stroke,
            width: row.width,
            height: row.height,
          }
        )
        
      } else {
        return (
          {
            left: row.left,
            top: row.top,
            isSelected: false,
            type: row.type,
            bgcolor: row.bgcolor,
            stroke: row.stroke,
            width: row.width,
            height: row.height,
          }
        )
      }
    })
    this._state.workSpace.shapes = newShapes;
    this._callSubscriber(this._state)
  },
  _changeFillColorPickerColor(newColor: string): void {
    this._state.toolbar.fillColorPickerColor = newColor;
    this._callSubscriber(this._state);
  },
  _changeStrokeColorPickerColor(newColor: string): void {
    this._state.toolbar.strokeColorPickerColor = newColor;
    this._callSubscriber(this._state);
  },
  _switchDisableFillColorPicker(isDisabled: boolean): void {
    this._state.toolbar.isDisableFillColorPicker = isDisabled;
    this._callSubscriber(this._state);
  },
  _switchDisableStrokeColorPicker(isDisabled: boolean): void {
    this._state.toolbar.isDisableStrokeColorPicker = isDisabled;
    this._callSubscriber(this._state);
  },
  dispatch(action: DispatchActionType) {
    this._state.workSpace = workspaceReducer(this._state.workSpace, action);
    this._state.toolbar = toolbarReducer(this._state.toolbar, action);
    this._callSubscriber(this._state);
  }
}

export const changeShapesActionCreator = (newShapes: Array<ShapesType>, count: number): DispatchActionType => {
  return {
    type: CHANGE_SHAPES,
    data: {
      newShapes: newShapes,
      count: count,
    }
  }
}
export const changeSelectActionCreator = (i: number): DispatchActionType => {
  return {
    type: CHANGE_SELECT,
    data: {
      indexShape: i
    }
  }
}
export const dischargeSelectActionCreator = (): DispatchActionType => {
  debugger
  return {
    type: DISCHARGE_SELECT,
  }
}
export const changeFillColorPickerColorActionCreator = (newColor: string): DispatchActionType => {
  debugger
  return {
    type: CHANGE_FILL_COLORPICKER_COLOR,
    data: {
      newColor: newColor
    }
  }
}
export const changeStrokeColorPickerColorActionCreator = (newColor: string): DispatchActionType => {
  debugger
  return {
    type: CHANGE_STROKE_COLORPICKER_COLOR,
    data: {
      newColor: newColor
    }
  }
}
export const switchDisableFillColorPickerActionCreator = (isDisabled: boolean): DispatchActionType => {
  debugger
  return {
    type: SWITCH_DISABLE_FILL_COLORPICKER,
    data: {
      isDisabled: isDisabled
    }
  }
}
export const switchDisableStrokeColorPickerActionCreator = (isDisabled: boolean): DispatchActionType => {
  debugger
  return {
    type: SWITCH_DISABLE_STROKE_COLORPICKER,
    data: {
      isDisabled: isDisabled
    }
  }
}
// window.store = store;
export default store