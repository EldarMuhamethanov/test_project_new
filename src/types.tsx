import React from 'react';

export type ShapesType = {
  left: string,
  top: string,
  isSelected: boolean,
  type: string,
  bgcolor: string,
  stroke: string,
  width: number,
  height: number,
}
export type ViewBoxType = [number, number, number, number];

export type StyleShapeType = {
  left: string,
  top: string,
  border?: string,
}