import React, { useRef } from 'react';
import rectangle from './../images/Rectangle2.png';
import triangle from './../images/Polygon1.png';
import { ShapesType } from '../types';
//import { changeShapesActionCreator, changeFillColorPickerColorActionCreator, changeStrokeColorPickerColorActionCreator } from '../redux/state';
import { changeShapesActionCreator } from '../redux/workspace-reducer';
import { changeStrokeColorPickerColorActionCreator, changeFillColorPickerColorActionCreator } from '../redux/toolbar-reducer';

type PropsType = {
  toolbarState: any, 
  countShapes: number
  shapes: Array<ShapesType>
  selectedShape: number | null
  dispatch: any
}

const Tools = (props: PropsType): JSX.Element => {

  const fillColorPicker: any = useRef(null);
  const strokeColorPicker: any = useRef(null);

  const changeShapeColor = (): void => {
    if (props.selectedShape !== null) {
      const newFillColor: any = fillColorPicker.current.value;
      props.dispatch(changeFillColorPickerColorActionCreator(newFillColor));
      const newStrokeColor = strokeColorPicker.current.value;
      props.dispatch(changeStrokeColorPickerColorActionCreator(newStrokeColor));
      let newShapes = props.shapes.slice();
      newShapes[props.selectedShape].bgcolor = newFillColor;
      newShapes[props.selectedShape].stroke = newStrokeColor;
      props.dispatch(changeShapesActionCreator(newShapes, newShapes.length))
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
    props.dispatch(changeShapesActionCreator(newShapes, newShapes.length))
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
          <input ref={fillColorPicker} disabled={props.toolbarState.isDisableFillColorPicker} type="color" id="fill_color" className="color_picker" value={props.toolbarState.fillColorPickerColor} onChange={() => changeShapeColor()}/>          
        </div>
        <div className="style_block">
          <label>Stroke</label>
          <input ref={strokeColorPicker} disabled={props.toolbarState.isDisableStrokeColorPicker} type="color" id="stroke_color" className="color_picker" value={props.toolbarState.strokeColorPickerColor} onChange={() => changeShapeColor()}/>          
        </div>
      </div>
    </div>
  )
}

export default Tools;