import React, { useContext } from 'react'
import { ParamsType } from '../types';
import { StoreType } from '../redux/redux-store';
import StoreContext from './StoreContext';
import { useDND } from '../MyHooks/useDND';

type PropsType = {
  params: ParamsType
}

const RectShape = (props: PropsType): JSX.Element => {
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
    >
      <rect 
        x="0"
        y="0"
        width={currShape.width}
        height={currShape.height}
        className="shape grab"
        fill={currShape.fillColor}
        stroke={currShape.strokeColor}
        strokeWidth="5"
        onMouseDown={useDND(store, Number(params.index), params.ref)}
      />
    </svg>
  )
}

export default RectShape;