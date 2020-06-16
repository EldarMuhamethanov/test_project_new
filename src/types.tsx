//import React from 'react';

export type ShapesType = {
  left: string,
  top: string,
  isSelected: boolean,
  type: string,
  bgcolor: string,
  stroke: string,
  width: number,
  height: number,
}
export type ViewBoxType = [number, number, number, number];

export type StyleShapeType = {
  left: string,
  top: string,
  border?: string,
}

export type StoreStateType = {
  workSpace: {
    count: number,
    shapes: Array<ShapesType>,
    selectedShape: number | null,
    isAnySelect: boolean,
  }
  toolbar: {
    fillColorPickerColor: string,
    isDisableFillColorPicker: boolean,
    strokeColorPickerColor: string,
    isDisableStrokeColorPicker: boolean,
  }
}

export type StoreType = {
  _state: StoreStateType,
  getState: () => StoreStateType,
  _callSubscriber: (state: any) => void,
  subscribe: (observer: any) => void,
  _changeShapes: (newShapes: Array<ShapesType>, count: number) => void,
  _dischargeSelect: () => void,
  _changeSelect: (indexShape: number) => void,
  _changeFillColorPickerColor: (newColor: string) => void,
  _changeStrokeColorPickerColor: (newColor: string) => void,
  _switchDisableFillColorPicker: (isDisabled: boolean) => void,
  _switchDisableStrokeColorPicker: (isDisabled: boolean) => void,
  dispatch: (action: DispatchActionType) => void,
}

export type DispatchActionType = {
  type: string,
  data?: any
}