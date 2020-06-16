import { StoreStateType, DispatchActionType, ShapesType } from "../types";

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
  if (action.type === CHANGE_SHAPES) {
    state.shapes = action.data.newShapes;
    state.count = action.data.count;
  }
  if (action.type === CHANGE_SELECT) {
    let newShapes : Array<ShapesType> = state.shapes.slice();
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
  }
  if (action.type === DISCHARGE_SELECT) {
    let newShapes : Array<ShapesType> = state.shapes.slice();
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
  }

  return state
}

export default workspaceReducer;