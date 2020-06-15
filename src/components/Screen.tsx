import React, {useState} from 'react';
import Tools from './Tools';
import WorkSpace from './WorkSpace';
import { ShapesType } from '../types';

const Screen = () => {
  let [count, setCount] = useState<number>(0);
  let [shapes, setShapes] = useState<Array<ShapesType>>([]);
  let [selectedShape, setSelectedShape] = useState<number | null>(null);

  const dischargeSelect = (): void => {
    let newShapes : Array<ShapesType> = shapes.slice();
    newShapes = newShapes.map((row, index): ShapesType => {
      return {
        left: row.left,
        top: row.top,
        isSelected: false,
        type: row.type,
        bgcolor: row.bgcolor,
        stroke: row.stroke,
        width: row.width,
        height: row.height,
      }
    })
    setShapes(newShapes);
    setSelectedShape(null);
  }

  const changeSelect = (i: number): void => {
    let newShapes : Array<ShapesType> = shapes.slice();
    newShapes = newShapes.map((row, index): ShapesType => {
      if (index === i) {
        setSelectedShape(index);
        return(
          {
            left: row.left,
            top: row.top,
            isSelected: true,
            type: row.type,
            bgcolor: row.bgcolor,
            stroke: row.stroke,
            width: row.width,
            height: row.height,
          }
        )
        
      } else {
        return (
          {
            left: row.left,
            top: row.top,
            isSelected: false,
            type: row.type,
            bgcolor: row.bgcolor,
            stroke: row.stroke,
            width: row.width,
            height: row.height,
          }
        )
      }
    })
    setShapes(newShapes);
  }

  const changeShapes = (newShapes: Array<ShapesType>, count: number): void => {
    setShapes(newShapes);
    setCount(count);
  } 


  return (
    <div className="screen">
      <Tools 
        countShapes={count}
        changeShapes={(newShapes: Array<ShapesType>, count: number) => changeShapes(newShapes, count)}
        shapes={shapes}
        selectedShape={selectedShape}
      />
      <WorkSpace 
        countShapes={count}
        shapes={shapes}
        selectedShape={selectedShape}
        changeSelect={(i: number) => changeSelect(i)}
        dischargeSelect={() => dischargeSelect()}
        changeShapes={(newShapes: Array<ShapesType>, count: number) => changeShapes(newShapes, count)}
      />
    </div>
  );
}

export default Screen;