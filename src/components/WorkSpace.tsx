import React, { useEffect } from 'react';
import { ShapesType } from '../types';
import { removeShapeActionCreator, setSelectionActionCreator } from '../redux/state-reducer';
import OneShape from './OneShape';


const WorkSpace = (props: any): JSX.Element => {
  
  const clickOnScreen = (e: React.MouseEvent): void => {
    if (!e.defaultPrevented) {
      props.store.dispatch(setSelectionActionCreator(null));
    }
  }

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
    const shapes: JSX.Element = props.store.getState().shapes.map((row: ShapesType, index: number): JSX.Element => {
      return <OneShape index={index} store={props.store}/>
    })
    return shapes;
  }

  return (
    <div id="work_space" className="right_part" onMouseDown={clickOnScreen}>
      {renderShapes()}
    </div>    
  );
}

export default WorkSpace;