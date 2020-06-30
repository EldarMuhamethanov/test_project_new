import React, { useRef, useContext } from 'react'
import { ViewBoxType, ParamsType } from '../types';
import StoreContext from './StoreContext';
import { StoreType } from '../redux/redux-store';
import RectShape from './RectShape';
import TrianShape from './TrianShape';

const OneShape = (props: Readonly<{ index: number }>): JSX.Element => {

  const refShape: React.Ref<SVGSVGElement> = useRef(null);
  const store: Readonly<StoreType> = useContext(StoreContext);
  
  const {
    shapes,
    selectedShapeId
  } = store.getState(); 
  
  // const triangleFreeZoneClick = (e: React.MouseEvent): void => {
  //   if (!e.defaultPrevented) {
  //     let pointerX: number;
  //     let pointerY: number;
  //     [pointerX, pointerY] = getRelativePointerСoordinates(e, "work_space");
  //     for (let i = shapes.length - 1; i >= 0; i--) {
  //       if (i === props.index) {
  //         continue
  //       }
  //       let currShape = shapes[i];
  //       let leftEdge = Number(currShape.left);
  //       let rightEdge = Number(currShape.left) + Number(currShape.width);
  //       let topEdge = Number(currShape.top);
  //       let bottomEdge = Number(currShape.top) + Number(currShape.height);
  //       if (leftEdge < pointerX && rightEdge > pointerX && topEdge < pointerY && bottomEdge > pointerY) {
  //         store.dispatch(actions.setSelectionActionCreator(i, shapes[i].ref));
  //         break;
  //       }
  //     }
  //     e.preventDefault();
  //   }
  // }

  const renderShape = (): JSX.Element => {
    

    const params: ParamsType = {
      ref: refShape as React.Ref<SVGSVGElement>,
      viewBox: [0, 0, 150, 100] as ViewBoxType,
      index: String(props.index) as string,
      selectedClass: props.index === selectedShapeId ? "selected_shape" : "not_selected_shape",
    }

    if (shapes[props.index].type === 'rect') {
      return (
        <RectShape params={params}/>
      )
    }
    if (shapes[props.index].type === 'triangle') {
      return (
        <TrianShape params={params}/>
      )
    }
    return(<div>Непредвиденная ошибка</div>)
  }
  
  return (
    renderShape()    
  );
}

export const getRelativePointerСoordinates = (e: React.MouseEvent | MouseEvent, parent: string): [number, number] => {
  let workSpace: HTMLElement | null ;
  if (workSpace = document.getElementById(parent)) {
    let targetCoords = workSpace.getBoundingClientRect();
    let xCoord = e.clientX - targetCoords.left;
    let yCoord = e.clientY - targetCoords.top;
    return [xCoord, yCoord];
  } 
  return [0, 0];
}


export default OneShape; 