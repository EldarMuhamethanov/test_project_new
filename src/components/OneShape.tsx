import React, { useRef } from 'react'
import { ShapesType, ViewBoxType, StyleShapeType } from '../types';

const OneShape = (props: any): JSX.Element => {

  const refShape: any = useRef(null);
  
  const selectShape = (e: React.MouseEvent): void => {
    e.preventDefault();
  }

  const mouseMove = (e: React.MouseEvent): void => {
    const cursorX: number = e.pageX;
    const cursorY: number = e.pageY;
    const windowWidth: number = window.innerWidth; 
    const windowHeight: number = window.innerHeight;
    const shapeWidth: number = props.shapes[props.index].width;
    const shapeHeight: number = props.shapes[props.index].height;
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
    let indexShape: number = +refShape.current.dataset.id;
    newShapes[indexShape].left = getComputedStyle(refShape.current).left;
    newShapes[indexShape].top = getComputedStyle(refShape.current).top;
    props.changeShapes(newShapes);
    props.changeSelect(indexShape);
    props.switchDisableFillColorPicker(false);
    props.switchDisableStrokeColorPicker(false);
    props.changeFillColorPickerColor(props.shapes[indexShape].bgcolor);
    props.changeStrokeColorPickerColor(props.shapes[indexShape].stroke);
  }
  
  const mouseDown = (): void => {
    refShape.current.addEventListener('mousemove', mouseMove);
    refShape.current.addEventListener('mouseup', mouseUp);
    let indexShape: number = +refShape.current.dataset.id;
    props.changeSelect(indexShape);
    props.changeFillColorPickerColor(props.shapes[indexShape].bgcolor);
    props.changeStrokeColorPickerColor(props.shapes[indexShape].stroke);
  }

  const renderShape = (): JSX.Element => {
    const viewBox: ViewBoxType = [0, 0, 150, 100];
    const row: ShapesType = props.shapes[props.index];
    const index: string = props.index;
    let style: StyleShapeType;
    if (row.isSelected && refShape.current !== null) {
      refShape.current.classList.remove('not_selected_shape');
      refShape.current.classList.add('selected_shape');
    } else if (!row.isSelected && refShape.current !== null) {
      refShape.current.classList.add('not_selected_shape');
      refShape.current.classList.remove('selected_shape');
    }
    let position = {
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
              fill={row.bgcolor}
              stroke={row.stroke}
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
          className="shape"
          style={ position }
          viewBox={"" + viewBox}
          id={"svg" + index}
          data-id={index}
          ref={refShape}
          onMouseDown={mouseDown}
          >
            <polygon 
              points="5,98 70,5 145,98" 
              fill={row.bgcolor} 
              stroke={row.stroke} 
              strokeWidth="5"
              onClick={selectShape}
            />
        </svg>
      )
    }
    return(<div></div>)
  }
  return (
    renderShape()    
  );
}

export default OneShape; 