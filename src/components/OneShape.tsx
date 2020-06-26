import React, { useRef, useEffect, useContext, Ref } from 'react'
import { ShapesType, ViewBoxType, PositionShapeType } from '../types';
import { actions, StateType } from '../redux/state-reducer';
import StoreContext from './StoreContext';
import { StoreType } from '../redux/redux-store';

const OneShape = (props: Readonly<{ index: number }>): JSX.Element => {

  const refShape: Ref<any> = useRef(null);
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
    if (!e.defaultPrevented) {
      e.preventDefault();
      document.body.addEventListener('mousemove', mouseMove);
      document.body.addEventListener('mouseup', mouseUp);
      refShape.current.firstChild.classList.add('grabbing');
      refShape.current.firstChild.classList.remove('grab');
      store.dispatch(actions.setSelectionActionCreator(props.index));
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
    const row: ShapesType = state.shapes[props.index];
    const index: string = String(props.index);
    let position: PositionShapeType = {
      top: row.top,
      left: row.left,
    }
    if (row.type === 'rect') {
      return (
        <svg 
          width={row.width}
          height={row.height}
          key={index}
          id={'svg' + index}
          data-id={index}
          className="shape"
          style={position}
          viewBox={String(viewBox)}
          ref={refShape}
          onMouseDown={mouseDown}
        >
          <rect 
            x="0"
            y="0"
            width={row.width}
            height={row.height}
            className="grab"
            fill={row.fillColor}
            stroke={row.strokeColor}
            strokeWidth="5"
            onMouseDown={mouseDown}
          />
        </svg>
      )
    }
    if (row.type === 'triangle') {
      return (
        <svg
          width={row.width}
          height={row.height} 
          key={index}
          className="shape"
          style={ position }
          viewBox={String(viewBox)}
          id={"svg" + index}
          data-id={index}
          ref={refShape}
          >
            <polygon 
              points="5,98 70,5 145,98"
              className="grab" 
              fill={row.fillColor} 
              stroke={row.strokeColor} 
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