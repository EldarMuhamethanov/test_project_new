import React, {useState} from 'react';
import Tools from './Tools';
import WorkSpace from './WorkSpace';
import { ShapesType, StoreStateType } from '../types';
import store from './../redux/state';

type PropsType = {
  state: StoreStateType,
  changeShapes: (newShapes: Array<ShapesType>, count: number) => void,
  changeSelect: (i: number) => void,
  dischargeSelect: () => void
}

const Screen = (props: PropsType) => {
  // let [count, setCount] = useState<number>(0);
  // let [shapes, setShapes] = useState<Array<ShapesType>>([]);
  // let [selectedShape, setSelectedShape] = useState<number | null>(null);

  // const dischargeSelect = (): void => {
  //   let newShapes : Array<ShapesType> = shapes.slice();
  //   newShapes = newShapes.map((row, index): ShapesType => {
  //     return {
  //       left: row.left,
  //       top: row.top,
  //       isSelected: false,
  //       type: row.type,
  //       bgcolor: row.bgcolor,
  //       stroke: row.stroke,
  //       width: row.width,
  //       height: row.height,
  //     }
  //   })
  //   setShapes(newShapes);
  //   setSelectedShape(null);
  // }

  // const changeSelect = (i: number): void => {
  //   let newShapes : Array<ShapesType> = shapes.slice();
  //   newShapes = newShapes.map((row, index): ShapesType => {
  //     if (index === i) {
  //       setSelectedShape(index);
  //       return(
  //         {
  //           left: row.left,
  //           top: row.top,
  //           isSelected: true,
  //           type: row.type,
  //           bgcolor: row.bgcolor,
  //           stroke: row.stroke,
  //           width: row.width,
  //           height: row.height,
  //         }
  //       )
        
  //     } else {
  //       return (
  //         {
  //           left: row.left,
  //           top: row.top,
  //           isSelected: false,
  //           type: row.type,
  //           bgcolor: row.bgcolor,
  //           stroke: row.stroke,
  //           width: row.width,
  //           height: row.height,
  //         }
  //       )
  //     }
  //   })
  //   setShapes(newShapes);
  // }

  // const changeShapes = (newShapes: Array<ShapesType>, count: number): void => {
  //   setShapes(newShapes);
  //   setCount(count);
  // } 
  debugger
  return (
    <div className="screen">
      <Tools 
        countShapes={props.state.count}
        changeShapes={props.changeShapes}
        shapes={props.state.shapes}
        selectedShape={props.state.selectedShape}
      />
      <WorkSpace 
        countShapes={props.state.count}
        shapes={props.state.shapes}
        selectedShape={props.state.selectedShape}
        changeSelect={props.changeSelect}
        dischargeSelect={props.dischargeSelect}
        changeShapes={props.changeShapes}
      />
    </div>
  );
}

export default Screen;