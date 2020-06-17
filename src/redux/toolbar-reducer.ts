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
  fillColorPickerColor: '#00000',
  isDisableFillColorPicker: true,
  strokeColorPickerColor: '#00000',
  isDisableStrokeColorPicker: true,
}
const localStorageState = (localStorage.getItem("toolbar") !== null) ? {
  fillColorPickerColor: JSON.parse(localStorage.getItem("toolbar")!).fillColorPickerColor,
  isDisableFillColorPicker: JSON.parse(localStorage.getItem("toolbar")!).isDisableFillColorPicker,
  strokeColorPickerColor: JSON.parse(localStorage.getItem("toolbar")!).strokeColorPickerColor,
  isDisableStrokeColorPicker: JSON.parse(localStorage.getItem("toolbar")!).isDisableStrokeColorPicker
} : initialState

export const toolbarReducer = (state: ToolbarStateType = localStorageState, action: DispatchActionType): ToolbarStateType => {
  switch (action.type) {
    case CHANGE_FILL_COLORPICKER_COLOR:
      state.fillColorPickerColor = action.data.newColor;
      localStorage.setItem("toolbar", JSON.stringify(state));
      return state;
    case CHANGE_STROKE_COLORPICKER_COLOR:
      state.strokeColorPickerColor = action.data.newColor;
      localStorage.setItem("toolbar", JSON.stringify(state));
      return state;
    case SWITCH_DISABLE_FILL_COLORPICKER:
      state.isDisableFillColorPicker = action.data.isDisabled;
      localStorage.setItem("toolbar", JSON.stringify(state));
      return state;
    case SWITCH_DISABLE_STROKE_COLORPICKER:
      state.isDisableStrokeColorPicker = action.data.isDisabled;
      localStorage.setItem("toolbar", JSON.stringify(state));
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