import React, { useRef, useEffect, useContext, Ref } from 'react'
import { ShapesType, ViewBoxType, PositionShapeType } from '../types';
import { actions, StateType } from '../redux/state-reducer';
import StoreContext from './StoreContext';
import { StoreType } from '../redux/redux-store';

const OneShape = (props: Readonly<{ index: number }>): JSX.Element => {

  const refShape: React.Ref<any> = useRef(null);
  const store: Readonly<StoreType> = useContext(StoreContext);
  const state: Readonly<StateType> = { ...store.getState() };

  const mouseMove = (e: MouseEvent): void => {
    const cursorX: number = e.pageX;
    const cursorY: number = e.pageY;
    const windowWidth: number = window.innerWidth; 
    const windowHeight: number = window.innerHeight;
    const shapeWidth: number = state.shapes[props.index].width;
    const shapeHeight: number = state.shapes[props.index].height;
    if (cursorX <= windowWidth * 0.25 + shapeWidth / 2) {
      store.dispatch(actions.setPositionActionCreator(props.index, String(0), String(cursorY - shapeHeight / 2)));
    } else if (cursorX >= windowWidth - shapeWidth / 2) {
      store.dispatch(actions.setPositionActionCreator(props.index, String(windowWidth * 0.745 - shapeWidth), String(cursorY - shapeHeight / 2)));
    } else if (cursorY >= windowHeight - shapeHeight / 2){
      store.dispatch(actions.setPositionActionCreator(props.index, String(cursorX - windowWidth * 0.25 -shapeWidth / 2), String(windowHeight - shapeHeight - 4)));
    } else if (cursorY <= shapeHeight / 2) {
      store.dispatch(actions.setPositionActionCreator(props.index, String(cursorX - windowWidth * 0.25 -shapeWidth / 2), String(0)));
    } else {
      store.dispatch(actions.setPositionActionCreator(props.index, String(cursorX - windowWidth * 0.25 - shapeWidth / 2), String(cursorY - shapeHeight / 2)));
    }
  }

  const mouseUp = (): void => {
    document.body.removeEventListener('mousemove', mouseMove);
    document.body.removeEventListener('mouseup', mouseUp);
    refShape.current.firstChild.classList.remove('grabbing');
    refShape.current.firstChild.classList.add('grab');
  }
  
  const mouseDown = (e: React.MouseEvent): void => {
    e.preventDefault();
    document.body.addEventListener('mousemove', mouseMove);
    document.body.addEventListener('mouseup', mouseUp);
    refShape.current.firstChild.classList.add('grabbing');
    refShape.current.firstChild.classList.remove('grab');
    store.dispatch(actions.setSelectionActionCreator(props.index));
  }

  const getRelativePointerСoordinates = (e: React.MouseEvent, parent: string): [number, number] => {
    let workSpace: HTMLElement | null ;
    if (workSpace= document.getElementById(parent)) {
      let targetCoords = workSpace.getBoundingClientRect();
      let xCoord = e.clientX - targetCoords.left;
      let yCoord = e.clientY - targetCoords.top;
      return [xCoord, yCoord];
    } 
    return [0, 0];
  }

  const triangleFreeZoneClick = (e: React.MouseEvent): void => {
    if (!e.defaultPrevented) {
      let pointerX: number;
      let pointerY: number;
      [pointerX, pointerY] = getRelativePointerСoordinates(e, "work_space");
      for (let i = 0; i < state.shapes.length; i++) {
        if (i === state.selectedShapeId) {
          continue
        }
        let currShape = state.shapes[i];
        let leftEdge = Number(currShape.left);
        let rightEdge = Number(currShape.left) + Number(currShape.width);
        let topEdge = Number(currShape.top);
        let bottomEdge = Number(currShape.top) + Number(currShape.height);
        if (leftEdge < pointerX && rightEdge > pointerX && topEdge < pointerY && bottomEdge > pointerY) {
          store.dispatch(actions.setSelectionActionCreator(i));
          break;
        }
      }
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (props.index === state.selectedShapeId && refShape.current !== null) {
      refShape.current.classList.remove('not_selected_shape');
      refShape.current.classList.add('selected_shape');
    } else if (props.index !== state.selectedShapeId && refShape.current !== null) {
      refShape.current.classList.add('not_selected_shape');
      refShape.current.classList.remove('selected_shape');
    }
  });

  const renderShape = (): JSX.Element => {
    const viewBox: ViewBoxType = [0, 0, 150, 100];
    const currShape: ShapesType = state.shapes[props.index];
    const index: string = String(props.index);
    let position: PositionShapeType = {
      top: currShape.top,
      left: currShape.left,
    }
    if (currShape.type === 'rect') {
      return (
        <svg 
          width={currShape.width}
          height={currShape.height}
          key={index}
          id={'svg' + index}
          data-id={index}
          className="shape_svg"
          style={position}
          viewBox={String(viewBox)}
          ref={refShape}
        >
          <rect 
            x="0"
            y="0"
            width={currShape.width}
            height={currShape.height}
            className="shape grab"
            fill={currShape.fillColor}
            stroke={currShape.strokeColor}
            strokeWidth="5"
            onMouseDown={mouseDown}
          />
        </svg>
      )
    }
    if (currShape.type === 'triangle') {
      return (
        <svg
          width={currShape.width}
          height={currShape.height}
          key={index}
          className="shape_svg"
          style={position}
          viewBox={String(viewBox)}
          id={"svg" + index}
          data-id={index}
          ref={refShape}
          onMouseDown={triangleFreeZoneClick}
          >
            <polygon 
              points="5,98 70,5 145,98"
              className="shape grab"
              fill={currShape.fillColor} 
              stroke={currShape.strokeColor} 
              strokeWidth="5"
              onMouseDown={mouseDown}
            />
        </svg>
      )
    }
    return(<div>Непредвиденная ошибка</div>)
  }
  return (
    renderShape()    
  );
}

export default OneShape; 