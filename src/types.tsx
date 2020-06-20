// type вынести в enum

import { type } from "os";

// привести имена bgcolor, stroke, fillColor, strokeColor к одному виду
export type ShapesType = {
  left: string,
  top: string,
  type: ShapeType,
  fillColor: string,
  strokeColor: string,
  width: number,
  height: number,
  //id: number,
}

export type ShapeType = "rect" | "triangle";

export type ViewBoxType = [number, number, number, number];

export type PositionShapeType = {
  left: string,
  top: string,
}

// export type DispatchActionType = {
//   type: string,
//   data?: any
// }

// export type StoreType = {
//   getState: () => StoreStateType;
//   dispatch: (action: DispatchActionType) => void; 
// }