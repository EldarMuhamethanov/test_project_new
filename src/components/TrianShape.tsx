import React, { useContext } from 'react'
import { ParamsType } from '../types';
import { StoreType } from '../redux/redux-store';
import StoreContext from './StoreContext';
import { useDND } from '../MyHooks/useDND';

type PropsType = {
  params: ParamsType
}

const TrianShape = (props: PropsType): JSX.Element => {
  const store: StoreType = useContext(StoreContext);
  const params = props.params;
  const currShape = store.getState().shapes[Number(params.index)];
  const position = {
    top: currShape.top,
    left: currShape.left
  }

  return (
    <svg
      width={currShape.width}
      height={currShape.height}
      key={params.index}
      className={params.selectedClass + " shape_svg" }
      style={position}
      viewBox={String(params.viewBox)}
      ref={params.ref}
      //onMouseDown={props.triangleClick}
      >
        <polygon 
          points="5,98 70,5 145,98"
          className="shape grab"
          fill={currShape.fillColor} 
          stroke={currShape.strokeColor} 
          strokeWidth="5"
          onMouseDown={useDND(store, Number(params.index), params.ref)}
        />
    </svg>
  )
}

export default TrianShape;
