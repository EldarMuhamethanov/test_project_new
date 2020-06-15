import React, { useState } from 'react';
import { ShapesType, StoreType, StoreStateType } from '../types';
debugger
type CallSubsType = {
  state?: any;
}
let store: StoreType = {
  _state: {
    count: 0,
    shapes: [],
    selectedShape: null,
    isAnySelect: false,
    fillColorPickerColor: "#00000",
    isDisableFillColorPicker: true,
    strokeColorPickerColor: "#000000",
    isDisableStrokeColorPicker: true,
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
  changeShapes(newShapes: Array<ShapesType>, count: number): void {
    debugger
    this._state.shapes = newShapes;
    this._state.count = count;
    this._callSubscriber(this._state)
  },
  dischargeSelect(): void {
    let newShapes : Array<ShapesType> = this._state.shapes.slice();
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
    this._state.shapes = newShapes;
    this._state.selectedShape = null;
    this._callSubscriber(this._state)
  },
  changeSelect(i: number): void {
    let newShapes : Array<ShapesType> = this._state.shapes.slice();
    newShapes = newShapes.map((row, index): ShapesType => {
      if (index === i) {
        this._state.selectedShape = index;
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
    this._state.shapes = newShapes;
    this._callSubscriber(this._state)
  }
}
// window.store = store;
export default store