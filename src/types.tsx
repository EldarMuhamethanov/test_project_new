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

export type WorkSpaceType = {
  count: number,
  shapes: Array<ShapesType>,
  selectedShape: number | null,
  isAnySelect: boolean,
}
export type ToolbarStateType = {
  fillColorPickerColor: string,
  isDisableFillColorPicker: boolean,
  strokeColorPickerColor: string,
  isDisableStrokeColorPicker: boolean,
}

export type StoreType = {
  workSpace: WorkSpaceType,
  toolbar: ToolbarStateType,
  dispatch: (action: string) => void 
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

export type DispatchActionType = {
  type: string,
  data?: any
}