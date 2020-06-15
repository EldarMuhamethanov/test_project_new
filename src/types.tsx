import React from 'react';

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
  count: number,
  shapes: Array<ShapesType>,
  selectedShape: number | null,
  isAnySelect: boolean,
  fillColorPickerColor: string,
  isDisableFillColorPicker: boolean,
  strokeColorPickerColor: string,
  isDisableStrokeColorPicker: boolean,
}

export type StoreType = {
  _state: StoreStateType,
  getState: () => StoreStateType,
  _callSubscriber: (state: any) => void,
  subscribe: (observer: any) => void,
  changeShapes: (newShapes: Array<ShapesType>, count: number) => void,
  dischargeSelect: () => void,
  changeSelect: (i: number) => void,
}