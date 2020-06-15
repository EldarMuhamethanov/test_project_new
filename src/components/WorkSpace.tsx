import React, { JSXElementConstructor, useEffect } from 'react';
import Shapes from './Shapes';
import { ShapesType } from '../types';

type PropsType = {
  countShapes: number,
  shapes: Array<ShapesType>,
  selectedShape: number|null,
  changeSelect:(i: number) => void,
  dischargeSelect: () => void,
  changeShapes: (newShapes: Array<ShapesType>, count: number) => void,
}

const WorkSpace = (props: PropsType): JSX.Element => {

  const clickOnScreen = (e: React.MouseEvent): void => {
    e.preventDefault();
    props.dischargeSelect();
  }

  const deleteShape = (e: any): void => {
    if (e.keyCode === 46 && props.selectedShape !== null) {
      let newShapes: Array<ShapesType> = props.shapes.slice();
      newShapes.splice(props.selectedShape, 1);
      props.changeShapes(newShapes, newShapes.length)
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
      <Shapes 
        countShapes={props.countShapes}
        shapes={props.shapes}
        changeSelect={(i: number) => props.changeSelect(i)}
        changeShapes={(newShapes: Array<ShapesType>, count: number) => props.changeShapes(newShapes, count)}
      />
    </div>
    )
}

export default WorkSpace;