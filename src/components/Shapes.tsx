import React from 'react'
import { ShapesType } from '../types';
import OneShapeContainer from './OneShapeContainer';
import StoreContext from './StoreContext';
import store from '../redux/redux-store';

type PropsType = {
  countShapes: number
  selectedShape: number | null
  shapes: Array<ShapesType>
  dispatch: any
}

const Shapes = (): JSX.Element  => {
  return (
    <StoreContext.Consumer>
      {
        (store: any) => {
          const renderShapes = (): JSX.Element=> { 
            const shapes: JSX.Element = store.getState().workSpace.shapes.map((row: ShapesType, index: number): JSX.Element => {
              return <OneShapeContainer index={index}/>
            })
            return shapes;
          }
          return (
            renderShapes()    
          );
        }
      }
    </StoreContext.Consumer>
  )
}

export default Shapes