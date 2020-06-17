import React from 'react'
import { ShapesType } from '../types';
import OneShapeContainer from './OneShapeContainer';

type PropsType = {
  countShapes: number
  selectedShape: number | null
  shapes: Array<ShapesType>
  dispatch: any
}

const Shapes = (props: any): JSX.Element => {
  const renderShapes = (): any => { 
    const rows = props.shapes.map((row: ShapesType, index: number) => {
      return <OneShapeContainer
        store={props.store}
        index={index}/>
    })
    return rows;
  }
  return (
    renderShapes()    
  );
}

export default Shapes