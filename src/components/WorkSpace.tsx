import React, { JSXElementConstructor, useEffect } from 'react';
import Shapes from './Shapes';
import { ShapesType } from '../types';
import { changeShapesActionCreator, dischargeSelectActionCreator, switchDisableFillColorPickerActionCreator, switchDisableStrokeColorPickerActionCreator } from '../redux/state';

type PropsType = {
  countShapes: number,
  shapes: Array<ShapesType>,
  selectedShape: number | null,
  dispatch: any,
}

const WorkSpace = (props: PropsType): JSX.Element => {

  const clickOnScreen = (e: React.MouseEvent): void => {
    e.preventDefault();
    props.dispatch(dischargeSelectActionCreator());
    props.dispatch(switchDisableFillColorPickerActionCreator(true));
    props.dispatch(switchDisableStrokeColorPickerActionCreator(true));
  }

  const deleteShape = (e: any): void => {
    if (e.keyCode === 46 && props.selectedShape !== null) {
      let newShapes: Array<ShapesType> = props.shapes.slice();
      newShapes.splice(props.selectedShape, 1);
      props.dispatch(changeShapesActionCreator(newShapes, newShapes.length))
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