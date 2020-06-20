import React, { useRef } from 'react';
import rectangle from './../images/Rectangle2.png';
import triangle from './../images/Polygon1.png';
import { addShapeActionCreator, setColorActionCreator, initialStateType } from '../redux/state-reducer';
import StoreContext from './StoreContext';
import { Store } from 'redux';

const Tools = (): any => {

  const fillColorPicker: any = useRef(null);
  const strokeColorPicker: any = useRef(null);
  return (
    <StoreContext.Consumer>
      {
        (store: any) => {
          const changeShapeColor = (): void => {
            debugger;
            if (store.getState().selectedShapeId !== null) {
              const newFillColor: string = fillColorPicker.current.value;
              const newStrokeColor: string = strokeColorPicker.current.value;
              store.dispatch(setColorActionCreator(newFillColor, newStrokeColor))
            }
          }

          return (
            <div id="tool_panel" className="left_part">
              <div className="select_new_shape">
                <h2>Shapes</h2>
                <div className="buttons_panel">
                  <img 
                    src={rectangle}
                    onClick={() => store.dispatch(addShapeActionCreator("rect"))}
                    alt="rectangle"
                    className="shape_button"
                  />
                  <img 
                    src={triangle}
                    onClick={() => store.dispatch(addShapeActionCreator("triangle"))}
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
                    value={store.getState().selectedShapeId !== null ? store.getState().shapes[store.getState().selectedShapeId].fillColor : '#000'}
                    onChange={() => changeShapeColor()} />          
                </div>
                <div className="style_block">
                  <label>Stroke</label>
                  <input
                    ref={strokeColorPicker} disabled={store.getState().selectedShapeId == null}
                    type="color" id="stroke_color" className="color_picker"
                    value={store.getState().selectedShapeId !== null ? store.getState().shapes[store.getState().selectedShapeId].strokeColor : '#000'}
                    onChange={() => changeShapeColor()} />          
                </div>
              </div>
            </div>
          )
        }
      }
    </StoreContext.Consumer>
  )
  
}

export default Tools;