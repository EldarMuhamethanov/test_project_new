import React, { useEffect } from 'react';
import Shapes from './Shapes';
import { ShapesType } from '../types';

type PropsType = {
  countShapes: number,
  shapes: Array<ShapesType>,
  selectedShape: number | null,
  dispatch: any,
}

const WorkSpace = (props: any): JSX.Element => {

  const clickOnScreen = (e: React.MouseEvent): void => {
    if (!e.defaultPrevented) {
      props.dischargeSelect();
      props.switchDisableFillColorPicker(true);
      props.switchDisableStrokeColorPicker(true);
    }
  }

  const deleteShape = (e: any): void => {
    if (e.keyCode === 46 && props.selectedShape !== null) {
      let newShapes: Array<ShapesType> = props.shapes.slice();
      newShapes.splice(props.selectedShape, 1);
      props.changeShapes(newShapes);
      props.switchDisableFillColorPicker(true);
      props.switchDisableStrokeColorPicker(true);
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", deleteShape);
    return () => {
      document.removeEventListener("keydown", deleteShape);
    }
  })
  return (
    <div id="work_space" className="right_part" onClick={clickOnScreen}>
      <Shapes />
    </div>
    )
}

export default WorkSpace;