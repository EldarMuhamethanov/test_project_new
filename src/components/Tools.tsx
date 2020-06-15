import React, { useRef, useState, useEffect} from 'react';
import rectangle from './../images/Rectangle2.png';
import triangle from './../images/Polygon1.png';
import { ShapesType } from '../types';

type PropsType = {
  countShapes: number
  changeShapes: (newShapes: Array<ShapesType>, count: number) => void
  shapes: Array<ShapesType>
  selectedShape: number | null
}

const Tools = (props: PropsType): JSX.Element => {
  const fillColorPicker: any = useRef(null);
  const strokeColorPicker: any = useRef(null);
  let [fillColorPickerColor, setColorPickerColor] = useState("#000000");
  let [isDisableFillColorPicker, setIsDisableFillColorPicker] = useState(true);
  let [strokeColorPickerColor, setStrokeColorPickerColor] = useState("#000000");
  let [isDisableStrokeColorPicker, setIsDisableStrokeColorPicker] = useState(true);

  useEffect((): void => {
    if (props.selectedShape !== null) {
      setIsDisableFillColorPicker(false);
      setIsDisableStrokeColorPicker(false);
      setColorPickerColor(props.shapes[props.selectedShape].bgcolor)
      setStrokeColorPickerColor(props.shapes[props.selectedShape].stroke)
    } else {
      setIsDisableFillColorPicker(true);
      setIsDisableStrokeColorPicker(true);
    }
  }, [props.selectedShape]);

  const changeShapeColor = (): void => {
    if (props.selectedShape !== null) {
      const newFillColor: any = fillColorPicker.current.value;
      setColorPickerColor(newFillColor);
      const newStrokeColor = strokeColorPicker.current.value;
      setStrokeColorPickerColor(newStrokeColor);
      let newShapes = props.shapes.slice();
      newShapes[props.selectedShape].bgcolor = newFillColor;
      newShapes[props.selectedShape].stroke = newStrokeColor;
      props.changeShapes(newShapes, props.countShapes);
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
    ])
    props.changeShapes(newShapes, props.countShapes + 1);
  }

  return (
    <div id="tool_panel" className="left_part">
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
      <div>
        <input ref={fillColorPicker} disabled={isDisableFillColorPicker} type="color" id="fill_color" className="color_picker" value={fillColorPickerColor} onChange={() => changeShapeColor()}/>
        <label>Fill</label>
      </div>
      <div>
        <input ref={strokeColorPicker} disabled={isDisableStrokeColorPicker} type="color" id="stroke_color" className="color_picker" value={strokeColorPickerColor} onChange={() => changeShapeColor()}/>
        <label>Stroke</label>
      </div>
    </div>
  )
}

export default Tools;