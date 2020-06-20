import { createStore } from "redux";
import stateReducer from "./state-reducer";

let store = createStore(stateReducer);

export default store 