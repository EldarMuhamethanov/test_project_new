export type ShapesType = {
  left: string,
  top: string,
  type: ShapeType,
  fillColor: string,
  strokeColor: string,
  width: number,
  height: number,
  id: number,
  ref: React.Ref<any>
}

export type ParamsType = {
  ref: React.Ref<SVGSVGElement>,
  viewBox: ViewBoxType,
  index: string,
  selectedClass: "selected_shape" | "not_selected_shape",
}

export type ShapeType = "rect" | "triangle";

export type ViewBoxType = [number, number, number, number];

export type PositionShapeType = {
  left: string,
  top: string,
}
