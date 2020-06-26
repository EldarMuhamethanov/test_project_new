import React, { useRef, Ref, useContext } from 'react';
import rectangle from './../images/Rectangle2.png';
import triangle from './../images/Polygon1.png';
import { actions } from '../redux/state-reducer';
import StoreContext from './StoreContext';
import { StoreType } from '../redux/redux-store';

const Tools = (): JSX.Element => {

  
  const fillColorPicker: Ref<HTMLInputElement> = useRef(null);
  const strokeColorPicker: Ref<HTMLInputElement> = useRef(null);
  const store: Readonly<StoreType> = useContext(StoreContext);
  
  const changeShapeColor = (): void => {
    if (store.getState().selectedShapeId !== null && fillColorPicker.current && strokeColorPicker.current) {
      const newFillColor: string = fillColorPicker.current.value;
      const newStrokeColor: string = strokeColorPicker.current.value;
      store.dispatch(actions.setColorActionCreator(newFillColor, newStrokeColor))
    }
  }
  return (
    <div id="tool_panel" className="left_part">
      <div className="select_new_shape">
        <h2>Shapes</h2>
        <div className="buttons_panel">
          <img 
            src={rectangle}
            onClick={() => store.dispatch(actions.addShapeActionCreator("rect"))}
            alt="rectangle"
            className="shape_button"
          />
          <img 
            src={triangle}
            onClick={() => store.dispatch(actions.addShapeActionCreator("triangle"))}
            alt="triangle"
            className="shape_button"
          />
        </div>
      </div>
      
      <div className="colorpickers">
        <h2>Style</h2>
        <div className="style_block">
          <label>Fill</label>
          <input
            ref={fillColorPicker} disabled={store.getState().selectedShapeId == null}
            type="color" id="fill_color" className="color_picker"
            value={store.getState().selectedShapeId !== null ? store.getState().shapes[Number(store.getState().selectedShapeId)].fillColor : '#000000'}
            onChange={() => changeShapeColor()} />          
        </div>
        <div className="style_block">
          <label>Stroke</label>
          <input
            ref={strokeColorPicker} disabled={store.getState().selectedShapeId == null}
            type="color" id="stroke_color" className="color_picker"
            value={store.getState().selectedShapeId !== null ? store.getState().shapes[Number(store.getState().selectedShapeId)].strokeColor : '#000000'}
            onChange={() => changeShapeColor()} />          
        </div>
      </div>
    </div>
  )
  
}

export default Tools;