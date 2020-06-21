import { createStore, Store } from "redux";
import stateReducer, { StateType, ActionTypes } from "./state-reducer";

let store: Store<StateType, ActionTypes>  = createStore(stateReducer);

export default store 