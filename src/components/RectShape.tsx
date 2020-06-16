import React, { useRef } from 'react'
import { ShapesType, ViewBoxType, StyleShapeType } from '../types';
import { changeShapesActionCreator } from '../redux/state';

type PropsType = {
  shapes: Array<ShapesType>
  data: ShapesType
  index: number
  dispatch: any
  selectShape: (shapeIndex: number) => void
}

const RectShape = (props: PropsType): JSX.Element => {

  const refShape: any = useRef(null);
  
  const selectShape = (e: React.MouseEvent): void => {
    let indexShape = +refShape.current.dataset.id;
    e.preventDefault();
    e.stopPropagation();
    props.selectShape(indexShape);
  }


  const mouseMove = (e: React.MouseEvent): void => {
    const cursorX: number = e.pageX;
    const cursorY: number = e.pageY;
    const windowWidth: number = window.innerWidth; 
    const windowHeight: number = window.innerHeight;
    const shapeWidth: number = row.width;
    const shapeHeight: number = row.height;
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
    refShape.current.removeEventListener('mousemove', mouseMove);
    refShape.current.removeEventListener('mouseup', mouseUp);
    let newShapes: Array<ShapesType> = props.shapes.slice();
    newShapes[index].left = getComputedStyle(refShape.current).left;
    newShapes[index].top = getComputedStyle(refShape.current).top;
    props.dispatch(changeShapesActionCreator(newShapes, newShapes.length))
  }
  
  const mouseDown = (): void => {
    refShape.current.addEventListener('mousemove', mouseMove);
    refShape.current.addEventListener('mouseup', mouseUp);
    let indexShape = +refShape.current.dataset.id;
    props.selectShape(indexShape);
  }
  const viewBox: ViewBoxType = [0, 0, 150, 100];
  const border: string = "2px dashed red";
  const row = props.data;
  const index = props.index;
  let style: StyleShapeType;
  if (row.isSelected) {
    style = {
      top: row.top,
      left: row.left,
      border: border
    }
  } else {
    style = {
      top: row.top,
      left: row.left
    }
  }
  return (
    <svg 
      width={row.width}
      height={row.height}
      key={index}
      id={'svg' + index}
      data-id={index}
      className="shape"
      style={style}
      viewBox={"" + viewBox}
      ref={refShape}
      onMouseDown={mouseDown}
    >
        <rect 
          x="0"
          y="0"
          width={row.width}
          height={row.height}
          fill={row.bgcolor}
          stroke={row.stroke}
          strokeWidth="5"
          onClick={selectShape}
        />
    </svg>
  )
}

export default RectShape