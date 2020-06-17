import { DispatchActionType } from "../types";

const CHANGE_FILL_COLORPICKER_COLOR = 'CHANGE-FILL-COLORPICKER-COLOR';
const CHANGE_STROKE_COLORPICKER_COLOR = 'CHANGE-STROKE-COLORPICKER-COLOR'; 
const SWITCH_DISABLE_FILL_COLORPICKER = 'SWITCH-DISABLE-FILL-COLORPICKER';
const SWITCH_DISABLE_STROKE_COLORPICKER = 'SWITCH-DISABLE-STROKE-COLORPICKER';

type ToolbarStateType = {
  fillColorPickerColor: string,
  isDisableFillColorPicker: boolean,
  strokeColorPickerColor: string,
  isDisableStrokeColorPicker: boolean,
}

const initialState = {
  fillColorPickerColor: "#00000",
  isDisableFillColorPicker: true,
  strokeColorPickerColor: "#000000",
  isDisableStrokeColorPicker: true,
}

export const toolbarReducer = (state: ToolbarStateType = initialState, action: DispatchActionType): ToolbarStateType => {
  switch (action.type) {
    case CHANGE_FILL_COLORPICKER_COLOR:
      state.fillColorPickerColor = action.data.newColor;
      return state;
    case CHANGE_STROKE_COLORPICKER_COLOR:
      state.strokeColorPickerColor = action.data.newColor;
      return state;
    case SWITCH_DISABLE_FILL_COLORPICKER:
      state.isDisableFillColorPicker = action.data.isDisabled;
      return state;
    case SWITCH_DISABLE_STROKE_COLORPICKER:
      state.isDisableStrokeColorPicker = action.data.isDisabled;
      return state
    default:
      return state
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

export default toolbarReducer;