import { ShapesType, ShapeType } from "../types";

const ADD_SHAPE = "ADD_SHAPE";
const REMOVE_SHAPE = 'REMOVE_SHAPE';
const SET_SELECTION = 'SET_SELECTION';
const SET_COLOR = 'SET_COLOR';

export type initialStateType = {
  shapes: Array<ShapesType>,
  selectedShapeId: number | null
}
let initialState: initialStateType = {
  shapes: [],
  selectedShapeId: null
}
let storageState;

if (localStorage.getItem("state") !== null) {
  storageState = JSON.parse(localStorage.getItem("state")!)
  initialState = {
    shapes: storageState.shapes,
    selectedShapeId: storageState.selectedShapeId
  }
}

const stateReducer = (state = initialState, action: any): initialStateType => {
  let newShapes: Array<ShapesType>;
  switch (action.type) {
    case ADD_SHAPE:
      newShapes = state.shapes.slice();
      const width: number = 150;
      const height: number = 100;
      newShapes = newShapes.concat([
        {
          type: action.data.shapeType === 'rect' ? 'rect' : 'triangle',
          //id: state.shapes.length,
          left: "calc(50% - " + width / 2 + "px)",
          top: "calc(50% - " + height / 2 + "px)",
          fillColor: "#000000",
          strokeColor: "#000000",
          width: width,
          height: height,
        }
      ]);
      state.shapes = newShapes;

      return state;
    
    case REMOVE_SHAPE:
      newShapes = state.shapes.slice();
      if (state.selectedShapeId !== null) {
        newShapes.splice(+state.selectedShapeId, 1);
      }
      state.shapes = newShapes;
      state.selectedShapeId = null;
      return state;
    
    case SET_SELECTION:
      state.selectedShapeId = action.data.shapeId;
      return state;
    
    case SET_COLOR:
      if (state.selectedShapeId !== null) {
        state.shapes[state.selectedShapeId].fillColor = action.data.newFillColor;
        state.shapes[state.selectedShapeId].strokeColor = action.data.newStrokeColor;
      }
      return state;
    default:
      return state;
  }
}
type addShapeActionCreatorType = {
  type: typeof ADD_SHAPE,
  data: {
    shapeType: ShapeType
  }
}
export const addShapeActionCreator = (type: ShapeType): addShapeActionCreatorType => {
  return {
    type: ADD_SHAPE,
    data: {
      shapeType: type
    }
  }
}

type removeShapeActionCreatorType = {
  type: typeof REMOVE_SHAPE;
} 

export const removeShapeActionCreator = (): removeShapeActionCreatorType => {
  return {
    type: REMOVE_SHAPE
  }
}

type setSelectionActionCreatorType = {
  type: typeof SET_SELECTION,
  data: {
    shapeId: number | null, 
  }
}

export const setSelectionActionCreator = (shapeId: number | null): setSelectionActionCreatorType => {
  return {
    type: SET_SELECTION,
    data: {
      shapeId: shapeId
    }
  }
}

type setColorActionCreatorType = {
  type: typeof SET_COLOR,
    data: {
      newFillColor: string,
      newStrokeColor: string
    }
}

export const setColorActionCreator = (newFillColor: string, newStrokeColor: string): setColorActionCreatorType => {
  return {
    type: SET_COLOR,
    data: {
      newFillColor: newFillColor,
      newStrokeColor: newStrokeColor
    }
  }
}

export default stateReducer;