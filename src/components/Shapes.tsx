import React from 'react'
import RectShape from './RectShape';
import TriangleShape from './TriangleShape';
import { ShapesType } from '../types';
import { changeSelectActionCreator } from '../redux/workspace-reducer';
import { switchDisableFillColorPickerActionCreator, switchDisableStrokeColorPickerActionCreator, changeFillColorPickerColorActionCreator, changeStrokeColorPickerColorActionCreator } from '../redux/toolbar-reducer';

type PropsType = {
  countShapes: number
  selectedShape: number | null
  shapes: Array<ShapesType>
  dispatch: any
}

const Shapes = (props: PropsType): JSX.Element => {
  const selectShape = (shapeIndex: number): void => {
    let newShape = props.shapes.slice();
    
    props.dispatch(changeSelectActionCreator(shapeIndex))
    props.dispatch(switchDisableFillColorPickerActionCreator(false));
    props.dispatch(switchDisableStrokeColorPickerActionCreator(false));
    if (props.selectedShape !== null) {
      props.dispatch(changeFillColorPickerColorActionCreator(props.shapes[props.selectedShape].bgcolor))
      props.dispatch(changeStrokeColorPickerColorActionCreator(props.shapes[props.selectedShape].stroke))
    }
  }

  
  const renderShapes = (): any => { 
    const rows = props.shapes.map((row: ShapesType, index: number) => {
      if (row.type === 'rect') {
        return <RectShape
          shapes={props.shapes}
          data={row}
          index={index}
          selectShape={selectShape}
          dispatch={props.dispatch}/>
      }
      if (row.type === 'triangle') {
        return <TriangleShape 
          shapes={props.shapes}
          data={row}
          index={index}
          selectShape={selectShape}
          dispatch={props.dispatch}/>
      }
    })
    return rows
  }

  return (
    renderShapes()    
  );
}

export default Shapes