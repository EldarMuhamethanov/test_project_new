import { createStore, Store } from "redux";
import stateReducer, { StateType, ActionTypes } from "./state-reducer";

let store = createStore(stateReducer);


export type StoreType = typeof store;


export default store 