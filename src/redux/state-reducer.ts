import { ShapesType, ShapeType } from "../types";

const ADD_SHAPE = "ADD_SHAPE";
const REMOVE_SHAPE = 'REMOVE_SHAPE';
const SET_SELECTION = 'SET_SELECTION';
const SET_COLOR = 'SET_COLOR';

export type StateType = typeof initialState;

let initialState = {
  shapes: [] as Array<ShapesType>,
  selectedShapeId: null as null | number
}

if (localStorage.getItem("state") !== null) {
  let storageState: typeof initialState = JSON.parse(String(localStorage.getItem("state")))
  initialState = {
    shapes: storageState.shapes,
    selectedShapeId: storageState.selectedShapeId
  }
}

const stateReducer = (state = initialState, action: ActionTypes): StateType => {
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
      localStorage.setItem("state", JSON.stringify({ ...state, shapes: newShapes}));
      return { ...state, shapes: newShapes};
    
    case REMOVE_SHAPE:
      newShapes = state.shapes.slice();
      if (state.selectedShapeId !== null) {
        newShapes.splice(+state.selectedShapeId, 1);
      }
      localStorage.setItem("state", JSON.stringify({ ...state, shapes: newShapes, selectedShapeId: null}));
      return { ...state, shapes: newShapes, selectedShapeId: null};
    
    case SET_SELECTION:
      localStorage.setItem("state", JSON.stringify({ ...state, selectedShapeId: action.data.shapeId}));
      return { ...state, selectedShapeId: action.data.shapeId};
    
    case SET_COLOR:
      if (state.selectedShapeId !== null) {
        state.shapes[state.selectedShapeId].fillColor = action.data.newFillColor;
        state.shapes[state.selectedShapeId].strokeColor = action.data.newStrokeColor;
      }
      localStorage.setItem("state", JSON.stringify(state));
      return state;
    
    default:
      localStorage.setItem("state", JSON.stringify(state));
      return state;
  }
}
export type addShapeActionCreatorType = {
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

export type removeShapeActionCreatorType = {
  type: typeof REMOVE_SHAPE;
} 

export const removeShapeActionCreator = (): removeShapeActionCreatorType => {
  return {
    type: REMOVE_SHAPE
  }
}

export type setSelectionActionCreatorType = {
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

export type setColorActionCreatorType = {
  type: typeof SET_COLOR,
    data: {
      newFillColor: string,
      newStrokeColor: string
    }
}

export const setColorActionCreator = (newFillColor: string, newStrokeColor: string) => {
  return {
    type: SET_COLOR,
    data: {
      newFillColor: newFillColor,
      newStrokeColor: newStrokeColor
    }
  } as const
}

export type ActionTypes = ReturnType<PropertiesType<typeof actions>>;

export type PropertiesType<T> = T extends { [key: string]: infer U} ? U: never;

const actions = {
  Ac1: (type: ShapeType) => ({
    type: ADD_SHAPE,
    data: {
      shapeType: type
    }
  } as const),

  Ac2: () => ({
    type: REMOVE_SHAPE
  } as const),

  Ac3: (shapeId: number | null) => ({
    type: SET_SELECTION,
    data: {
      shapeId: shapeId
    }
  } as const),

  Ac4: (newFillColor: string, newStrokeColor: string) => ({
    type: SET_COLOR,
    data: {
      newFillColor: newFillColor,
      newStrokeColor: newStrokeColor
    }
  } as const)
}

export default stateReducer;