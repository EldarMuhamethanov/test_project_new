import { StoreStateType, DispatchActionType } from "../types";

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

export const toolbarReducer = (state: ToolbarStateType, action: DispatchActionType): ToolbarStateType => {
  if (action.type === CHANGE_FILL_COLORPICKER_COLOR) {
    state.fillColorPickerColor = action.data.newColor;
  }
  if (action.type === CHANGE_STROKE_COLORPICKER_COLOR) {
    state.strokeColorPickerColor = action.data.newColor;
  }
  if (action.type === SWITCH_DISABLE_FILL_COLORPICKER) {
    state.isDisableFillColorPicker = action.data.isDisabled;
  }
  if (action.type === SWITCH_DISABLE_STROKE_COLORPICKER) {
    state.isDisableStrokeColorPicker = action.data.isDisabled;
  }
  return state;
}

export default toolbarReducer;