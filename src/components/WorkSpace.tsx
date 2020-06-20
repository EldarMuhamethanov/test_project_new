import React, { useEffect } from 'react';
import { ShapesType } from '../types';
import { removeShapeActionCreator } from '../redux/state-reducer';
import OneShape from './OneShape';


const WorkSpace = (props: any): JSX.Element => {

  const deleteShape = (e: KeyboardEvent): void => {
    if (e.keyCode === 46 && props.store.getState().selectedShapeId !== null) {
      props.store.dispatch(removeShapeActionCreator())
    }
  }
  
  useEffect(() => {
    document.addEventListener("keydown", deleteShape);
    return () => {
      document.removeEventListener("keydown", deleteShape);
    }
  })
  
  const renderShapes = (): JSX.Element=> { 
    const shapes: any = props.store.getState().shapes.map((row: ShapesType, index: number): JSX.Element => {
      return <OneShape index={index}/>
    })
    return shapes;
  }

  return (
    renderShapes()    
  );
}

export default WorkSpace;