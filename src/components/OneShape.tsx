import React, { useRef } from 'react'
import { ShapesType, ViewBoxType, PositionShapeType } from '../types';
import store from '../redux/redux-store';
import { setSelectionActionCreator } from '../redux/state-reducer';

type PropsType = {
  changeShapes: (newShapes: Array<ShapesType>) => void,
  changeSelect: (indexShape: number) => void,
  switchDisableFillColorPicker: (isDisabled: boolean) => void,
  switchDisableStrokeColorPicker: (isDisabled: boolean) => void,
  changeFillColorPickerColor: (newColor: string) => void, 
  changeStrokeColorPickerColor: (newColor: string) => void,
  shapes: Array<ShapesType>,
  index: number,
}

const OneShape = (props: any): JSX.Element => {

  const refShape: any = useRef<any>(null);
  
  const selectShape = (e: React.MouseEvent): void => {
    e.preventDefault();
    console.log(store.getState());
  }

  const mouseMove = (e: MouseEvent): void => {
    const cursorX: number = e.pageX;
    const cursorY: number = e.pageY;
    const windowWidth: number = window.innerWidth; 
    const windowHeight: number = window.innerHeight;
    const shapeWidth: number = store.getState().shapes[props.index].width;
    const shapeHeight: number = store.getState().shapes[props.index].height;
    if (cursorX <= windowWidth * 0.25 + shapeWidth / 2) {
      refShape.current.style.left = 0;
      refShape.current.style.top = cursorY - shapeHeight / 2;
    } else if (cursorX >= windowWidth - shapeWidth / 2) {
      refShape.current.style.left = windowWidth * 0.745 - shapeWidth;
      refShape.current.style.top = cursorY - shapeHeight / 2;
    } else if (cursorY >= windowHeight - shapeHeight / 2){
      refShape.current.style.left = cursorX - windowWidth * 0.25 -shapeWidth / 2;
      refShape.current.style.top = windowHeight - shapeHeight - 4;
    } else if (cursorY <= shapeHeight / 2) {
      refShape.current.style.left = cursorX - windowWidth * 0.25 -shapeWidth / 2;
      refShape.current.style.top = 0;
    } else {
      refShape.current.style.left = e.pageX - windowWidth * 0.25 - shapeWidth / 2;
      refShape.current.style.top = e.pageY - shapeHeight / 2;
    }
  }

  const mouseUp = (): void => {
    document.body.removeEventListener('mousemove', mouseMove);
    document.body.removeEventListener('mouseup', mouseUp);
    refShape.current.firstChild.classList.remove('grabbing');
    refShape.current.firstChild.classList.add('grab');
    let newShapes: Array<ShapesType> = store.getState().shapes.slice();
    let indexShape: number = +refShape.current.dataset.id;
    newShapes[indexShape].left = getComputedStyle(refShape.current).left;
    newShapes[indexShape].top = getComputedStyle(refShape.current).top;
    store.getState().shapes = newShapes;
    console.log(store.getState());
  }
  
  const mouseDown = (e: any): void => {
    if (!e.defaultPrevented) {
      e.preventDefault();
      document.body.addEventListener('mousemove', mouseMove);
      document.body.addEventListener('mouseup', mouseUp);
      refShape.current.firstChild.classList.add('grabbing');
      refShape.current.firstChild.classList.remove('grab');
      let indexShape: number = +refShape.current.dataset.id;
      store.dispatch(setSelectionActionCreator(indexShape));
      console.log(store.getState());
    }
  }

  const renderShape = (): JSX.Element => {
    const viewBox: ViewBoxType = [0, 0, 150, 100];
    const row: ShapesType = store.getState().shapes[props.index];
    const index: string = props.index + "";
    if (props.index === store.getState().selectedShapeId && refShape.current !== null) {
      refShape.current.classList.remove('not_selected_shape');
      refShape.current.classList.add('selected_shape');
    } else if (props.index !== store.getState().selectedShapeId && refShape.current !== null) {
      refShape.current.classList.add('not_selected_shape');
      refShape.current.classList.remove('selected_shape');
      
    }
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
          className="shape not_selected_shape"
          style={position}
          viewBox={"" + viewBox}
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
              onClick={selectShape}
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
          className="shape not_selected_shape"
          style={ position }
          viewBox={"" + viewBox}
          id={"svg" + index}
          data-id={index}
          ref={refShape}
          onMouseDown={mouseDown}
          >
            <polygon 
              points="5,98 70,5 145,98"
              className="grab" 
              fill={row.fillColor} 
              stroke={row.strokeColor} 
              strokeWidth="5"
              onClick={selectShape}
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