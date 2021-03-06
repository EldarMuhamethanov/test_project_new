import React, { useEffect, useContext } from 'react';
import { ShapesType } from '../types';
import { actions } from '../redux/state-reducer';
import OneShape from './OneShape';
import StoreContext from './StoreContext';
import { StoreType } from '../redux/redux-store';


const WorkSpace = (): JSX.Element => {
  
  const store: Readonly<StoreType> = useContext(StoreContext);

  const {
    shapes,
    selectedShapeId
  } = store.getState();

  const clickOnScreen = (e: React.MouseEvent): void => {
    if (!e.defaultPrevented) {
      store.dispatch(actions.setSelection(null, null));
    }
  }

  const deleteShape = (e: KeyboardEvent): void => {
    if (e.keyCode === 46 && selectedShapeId !== null) {
      store.dispatch(actions.removeShape())
    }
  }
  
  useEffect(() => {
    document.addEventListener("keydown", deleteShape);
    return () => {
      document.removeEventListener("keydown", deleteShape);
    }
  })
  
  const renderShapes = (): Array<JSX.Element> => { 
    const shapesJSX: Array<JSX.Element> = shapes.map((row: ShapesType, index: number): JSX.Element => {
      return <OneShape index={index} />
    })
    return shapesJSX;
  }

  return (
    <div id="work_space" className="right_part" onMouseDown={clickOnScreen}>
      {renderShapes()}
    </div>    
  );
}

export default WorkSpace;