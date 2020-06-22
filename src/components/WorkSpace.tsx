import React, { useEffect, useContext } from 'react';
import { ShapesType } from '../types';
import { removeShapeActionCreator, setSelectionActionCreator, StateType, ActionTypes, actions } from '../redux/state-reducer';
import OneShape from './OneShape';
import { Store } from 'redux';
import StoreContext from './StoreContext';


const WorkSpace = (props: any): JSX.Element => {
  
  const store: Store<StateType, ActionTypes> = useContext(StoreContext);
  
  const clickOnScreen = (e: React.MouseEvent): void => {
    if (!e.defaultPrevented) {
      store.dispatch(actions.setSelectionActionCreator(null));
    }
  }

  const deleteShape = (e: KeyboardEvent): void => {
    if (e.keyCode === 46 && store.getState().selectedShapeId !== null) {
      store.dispatch(actions.removeShapeActionCreator())
    }
  }
  
  useEffect(() => {
    document.addEventListener("keydown", deleteShape);
    return () => {
      document.removeEventListener("keydown", deleteShape);
    }
  })
  
  const renderShapes = (): Array<JSX.Element> => { 
    const shapes: Array<JSX.Element> = store.getState().shapes.map((row: ShapesType, index: number): JSX.Element => {
      return <OneShape index={index} />
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