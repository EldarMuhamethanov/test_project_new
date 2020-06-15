import React, { useRef } from 'react'
import RectShape from './RectShape';
import TriangleShape from './TriangleShape';
import { ShapesType } from '../types';

type PropsType = {
  countShapes: number
  shapes: Array<ShapesType>
  changeSelect: (i: number) => void
  changeShapes: (newShapes: Array<ShapesType>, count: number) => void
}

const Shapes = (props: PropsType): JSX.Element => {
  const selectShape = (shapeIndex: number): void => {
    props.changeSelect(shapeIndex)
  }

  
  const renderShapes = (): any => { 
    const rows = props.shapes.map((row: ShapesType, index: number) => {
      if (row.type === 'rect') {
        return <RectShape
          shapes={props.shapes}
          data={row}
          index={index}
          selectShape={(shapeIndex: number) => selectShape(shapeIndex)}
          changeShapes={(newShapes: Array<ShapesType>, count: number) => props.changeShapes(newShapes, count)}/>
      }
      if (row.type === 'triangle') {
        return <TriangleShape 
          shapes={props.shapes}
          data={row}
          index={index}
          selectShape={(shapeIndex: number) => selectShape(shapeIndex)}
          changeShapes={(newShapes: Array<ShapesType>, count: number) => props.changeShapes(newShapes, count)}/>
      }
    })
    return rows
  }

  return (
    renderShapes()    
  );
}

export default Shapes