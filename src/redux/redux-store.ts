import { createStore, combineReducers } from "redux";
import workspaceReducer from "./workspace-reducer";
import toolbarReducer from "./toolbar-reducer";

let reducers = combineReducers({
  workSpace: workspaceReducer,
  toolbar: toolbarReducer
});

let store = createStore(reducers);

export default store 