import { ShapesType, StoreStateType, DispatchActionType } from '../types';
import workspaceReducer from './workspace-reducer';
import toolbarReducer from './toolbar-reducer';

let store: any = {
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
  dispatch(action: DispatchActionType) {
    this._state.workSpace = workspaceReducer(this._state.workSpace, action);
    this._state.toolbar = toolbarReducer(this._state.toolbar, action);
    this._callSubscriber(this._state);
  }
}


// window.store = store;
export default store