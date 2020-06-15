import React, { JSXElementConstructor, useEffect } from 'react';
import Shapes from './Shapes';
import { ShapesType } from '../types';

type PropsType = {
  countShapes: number,
  shapes: Array<ShapesType>,
  selectedShape: number | null,
  dispatch: any,
}

const WorkSpace = (props: PropsType): JSX.Element => {

  const clickOnScreen = (e: React.MouseEvent): void => {
    e.preventDefault();
    props.dispatch({
      type: 'DISCHARGE-SELECT',
    })
  }

  const deleteShape = (e: any): void => {
    if (e.keyCode === 46 && props.selectedShape !== null) {
      let newShapes: Array<ShapesType> = props.shapes.slice();
      newShapes.splice(props.selectedShape, 1);
      props.dispatch({
        type: 'CHANGE-SHAPES',
        data: {
          newShapes: newShapes,
          count: newShapes.length
        }
      })
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
        dispatch={props.dispatch}
      />
    </div>
    )
}

export default WorkSpace;