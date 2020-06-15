import React, { useRef } from 'react'
import RectShape from './RectShape';
import TriangleShape from './TriangleShape';
import { ShapesType } from '../types';

type PropsType = {
  countShapes: number
  shapes: Array<ShapesType>
  dispatch: any
}

const Shapes = (props: PropsType): JSX.Element => {
  const selectShape = (shapeIndex: number): void => {
    props.dispatch({
      type: 'CHANGE-SELECT',
      data: {
        i: shapeIndex
      }
    })
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