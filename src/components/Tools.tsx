import React, { useRef } from 'react';
import rectangle from './../images/Rectangle2.png';
import triangle from './../images/Polygon1.png';
import { ShapesType } from '../types';

type PropsType = {
  toolbarState: any, 
  countShapes: number
  shapes: Array<ShapesType>
  selectedShape: number | null
  dispatch: any
}

const Tools = (props: any): JSX.Element => {

  const fillColorPicker: any = useRef(null);
  const strokeColorPicker: any = useRef(null);

  const changeShapeColor = (): void => {
    if (props.selectedShape !== null) {
      const newFillColor: any = fillColorPicker.current.value;
      props.changeFillColorPickerColor(newFillColor);
      const newStrokeColor = strokeColorPicker.current.value;
      props.changeStrokeColorPickerColor(newStrokeColor);
      let newShapes = props.shapes.slice();
      newShapes[props.selectedShape].bgcolor = newFillColor;
      newShapes[props.selectedShape].stroke = newStrokeColor;
      props.changeShapes(newShapes);
    }
  }

  const addShape = (currType: string): void => {
    let newShapes: Array<ShapesType> = props.shapes.slice();
    const width: number = 150;
    const height: number = 100;
    newShapes = newShapes.concat([
      {
        type: currType === 'rect' ? 'rect' : 'triangle',
        left: "calc(50% - " + width / 2 + "px)",
        top: "calc(50% - " + height / 2 + "px)",
        isSelected: false,
        bgcolor: "#000",
        stroke: "#000",
        width: width,
        height: height,
      }
    ]);
    props.changeShapes(newShapes);
  }

  return (
    <div id="tool_panel" className="left_part">
      <div className="select_new_shape">
        <h2>Shapes</h2>
        <div className="buttons_panel">
          <img 
            src={rectangle}
            onClick={() => addShape('rect')}
            alt="rectangle"
            className="shape_button"
          />
          <img 
            src={triangle}
            onClick={() => addShape('triangle')}
            alt="triangle"
            className="shape_button"
          />
        </div>
      </div>
      
      <div className="colorpickers">
        <h2>Style</h2>
        <div className="style_block">
          <label>Fill</label>
          <input ref={fillColorPicker} disabled={props.isDisableFillColorPicker} type="color" id="fill_color" className="color_picker" value={props.fillColorPickerColor} onChange={() => changeShapeColor()}/>          
        </div>
        <div className="style_block">
          <label>Stroke</label>
          <input ref={strokeColorPicker} disabled={props.isDisableStrokeColorPicker} type="color" id="stroke_color" className="color_picker" value={props.strokeColorPickerColor} onChange={() => changeShapeColor()}/>          
        </div>
      </div>
    </div>
  )
}

export default Tools;