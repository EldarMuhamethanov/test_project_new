import { DispatchActionType, ShapesType, WorkSpaceType } from "../types";

const CHANGE_SHAPES = 'CHANGE-SHAPES';
const CHANGE_SELECT = 'CHANGE-SELECT';
const DISCHARGE_SELECT = 'DISCHARGE-SELECT';



const initialState: WorkSpaceType = (localStorage.getItem("workSpace") === null) ? {
  count: 0,
  shapes: [],
  selectedShape: null,
  isAnySelect: false,
} : {
  count: JSON.parse(localStorage.getItem("workSpace")!).count,
  shapes: JSON.parse(localStorage.getItem("workSpace")!).shapes,
  selectedShape: JSON.parse(localStorage.getItem("workSpace")!).selectedShape,
  isAnySelect: JSON.parse(localStorage.getItem("workSpace")!).isAnySelect,
} 

// const localStorageState: WorkSpaceType = (localStorage.getItem("workSpace") !== null) ? {
//   count: JSON.parse(localStorage.getItem("workSpace")!).count,
//   shapes: JSON.parse(localStorage.getItem("workSpace")!).shapes,
//   selectedShape: JSON.parse(localStorage.getItem("workSpace")!).selectedShape,
//   isAnySelect: JSON.parse(localStorage.getItem("workSpace")!).isAnySelect,
// } : initialState

const workspaceReducer = (state: WorkSpaceType = initialState, action: DispatchActionType): WorkSpaceType => {
  let newShapes: Array<ShapesType>;
  switch (action.type) {
    case CHANGE_SHAPES: 
      state.shapes = action.data.newShapes;
      state.count = action.data.count;
      localStorage.setItem("workSpace", JSON.stringify(state));
      return state
    case CHANGE_SELECT:
      newShapes = state.shapes.slice();
      newShapes = newShapes.map((row, index): ShapesType => {
        if (index === action.data.indexShape) {
          state.selectedShape = index;
          return(
            {
              left: row.left,
              top: row.top,
              isSelected: true,
              type: row.type,
              bgcolor: row.bgcolor,
              stroke: row.stroke,
              width: row.width,
              height: row.height,
            }
          )
          
        } else {
          return (
            {
              left: row.left,
              top: row.top,
              isSelected: false,
              type: row.type,
              bgcolor: row.bgcolor,
              stroke: row.stroke,
              width: row.width,
              height: row.height,
            }
          )
        }
      })
      state.shapes = newShapes;
      localStorage.setItem("workSpace", JSON.stringify(state));
      return state
    case DISCHARGE_SELECT: 
      newShapes = state.shapes.slice();
      newShapes = newShapes.map((row, index): ShapesType => {
        return {
          left: row.left,
          top: row.top,
          isSelected: false,
          type: row.type,
          bgcolor: row.bgcolor,
          stroke: row.stroke,
          width: row.width,
          height: row.height,
        }
      })
      state.shapes = newShapes;
      state.selectedShape = null;
      localStorage.setItem("workSpace", JSON.stringify(state));
      return state
    default:
      localStorage.setItem("workSpace", JSON.stringify(state));
      return state
  }
}

export const changeShapesActionCreator = (newShapes: Array<ShapesType>, count: number): DispatchActionType => {
  return {
    type: CHANGE_SHAPES,
    data: {
      newShapes: newShapes,
      count: count,
    }
  }
}
export const changeSelectActionCreator = (i: number): DispatchActionType => {
  return {
    type: CHANGE_SELECT,
    data: {
      indexShape: i
    }
  }
}
export const dischargeSelectActionCreator = (): DispatchActionType => {
  debugger
  return {
    type: DISCHARGE_SELECT,
  }
}

export default workspaceReducer;