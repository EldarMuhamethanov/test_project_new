import { DispatchActionType, ShapesType } from "../types";

const CHANGE_SHAPES = 'CHANGE-SHAPES';
const CHANGE_SELECT = 'CHANGE-SELECT';
const DISCHARGE_SELECT = 'DISCHARGE-SELECT';

type WorkSpaceType = {
  count: number,
  shapes: Array<ShapesType>,
  selectedShape: number | null,
  isAnySelect: boolean,
}

const workspaceReducer = (state: WorkSpaceType, action: DispatchActionType): WorkSpaceType => {
  let newShapes: Array<ShapesType>;
  switch (action.type) {
    case CHANGE_SHAPES: 
      state.shapes = action.data.newShapes;
      state.count = action.data.count;
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
      return state
    default:
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