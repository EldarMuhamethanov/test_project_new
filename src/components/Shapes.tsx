import React from 'react'
import { ShapesType } from '../types';
import { changeSelectActionCreator } from '../redux/workspace-reducer';
import { switchDisableFillColorPickerActionCreator, switchDisableStrokeColorPickerActionCreator, changeFillColorPickerColorActionCreator, changeStrokeColorPickerColorActionCreator } from '../redux/toolbar-reducer';
import OneShape from './OneShape';

type PropsType = {
  countShapes: number
  selectedShape: number | null
  shapes: Array<ShapesType>
  dispatch: any
}

const Shapes = (props: PropsType): JSX.Element => {
  const selectShape = (shapeIndex: number): void => {
    props.dispatch(changeSelectActionCreator(shapeIndex))
    props.dispatch(switchDisableFillColorPickerActionCreator(false));
    props.dispatch(switchDisableStrokeColorPickerActionCreator(false));
    props.dispatch(changeFillColorPickerColorActionCreator(props.shapes[shapeIndex].bgcolor))
    props.dispatch(changeStrokeColorPickerColorActionCreator(props.shapes[shapeIndex].stroke)) 
  }
  debugger
  const renderShapes = (): any => { 
    const rows = props.shapes.map((row: ShapesType, index: number) => {
      return <OneShape
        shapes={props.shapes}
        selectedShape={props.selectedShape}
        dispatch={props.dispatch}
        data={row}
        index={index}
        selectShape={selectShape}/>
    })
    return rows;
  }
  debugger
  return (
    renderShapes()    
  );
}

export default Shapes