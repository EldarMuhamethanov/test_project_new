import { ShapesType, ShapeType } from "../types";

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
  let newState = { ...state };
  newState.shapes = [...state.shapes];
  switch (action.type) {
    case 'ADD_SHAPE':
      // newShapes = state.shapes.slice();
      
      const width: number = 150;
      const height: number = 100;
      newState.shapes = newState.shapes.concat([
        {
          type: action.data.shapeType === 'rect' ? 'rect' : 'triangle',
          left: "calc(50% - " + width / 2 + "px)",
          top: "calc(50% - " + height / 2 + "px)",
          fillColor: "#000000",
          strokeColor: "#000000",
          width: width,
          height: height,
        }
      ]);
      break;
    
    case 'REMOVE_SHAPE':
      newState.shapes.splice(Number(newState.selectedShapeId), 1);
      newState.selectedShapeId = null;
      break;
    
    case 'SET_SELECTION':
      newState.selectedShapeId = action.data.shapeId;
      break;
    
    case 'SET_COLOR':
      newState.shapes[Number(newState.selectedShapeId)].fillColor = action.data.newFillColor;
      newState.shapes[Number(newState.selectedShapeId)].strokeColor = action.data.newStrokeColor;
      break;
    
    case 'SET_POSITION':
      newState.shapes[action.data.shapeIndex].left = action.data.left;
      newState.shapes[action.data.shapeIndex].top = action.data.top;
      break;
    
    default:
      break;
  }
  localStorage.setItem("state", JSON.stringify(newState));
  return newState;
}

export type ActionTypes = ReturnType<PropertiesType<typeof actions>>;

export type PropertiesType<T> = T extends { [key: string]: infer U} ? U: never;

export const actions = {
  addShapeActionCreator : (type: ShapeType) => {
    return {
      type: 'ADD_SHAPE',
      data: {
        shapeType: type
      }
    } as const
  },
  removeShapeActionCreator : () => {
    return {
      type: 'REMOVE_SHAPE'
    } as const
  }, 
  setSelectionActionCreator : (shapeId: number | null) => {
    return {
      type: 'SET_SELECTION',
      data: {
        shapeId: shapeId
      }
    } as const
  },
  setColorActionCreator : (newFillColor: string, newStrokeColor: string) => {
    return {
      type: 'SET_COLOR',
      data: {
        newFillColor: newFillColor,
        newStrokeColor: newStrokeColor
      }
    } as const
  },
  setPositionActionCreator: (shapeIndex: number, shapeX: string, shapeY: string) => {
    return {
      type: 'SET_POSITION',
      data: {
        shapeIndex: shapeIndex,
        left: shapeX,
        top: shapeY,
      }
    } as const
  }
}

export default stateReducer;