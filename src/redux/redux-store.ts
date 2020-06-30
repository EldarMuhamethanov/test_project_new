import { createStore } from "redux";
import stateReducer from "./state-reducer";

let store = createStore(stateReducer);


export declare type StoreType = typeof store;


export default store 