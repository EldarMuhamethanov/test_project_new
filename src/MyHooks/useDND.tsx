import { StoreType } from "../redux/redux-store";
import { ShapesType } from "../types";
import { actions } from "../redux/state-reducer";
import { getRelativePointerСoordinates } from "../components/OneShape";

export const useDND = (store: StoreType, index: number, refShape: any): (e: React.MouseEvent) => void => {
  let shapes: Array<ShapesType> = store.getState().shapes;
  const mouseMove = (e: MouseEvent): void => {
    let cursorX: number;
    let cursorY: number;
    const workSpaceWidth: number = window.innerWidth * 0.75;
    const workSpaceHeight: number = window.innerHeight;
    [cursorX, cursorY] = getRelativePointerСoordinates(e, "work_space");
    const shapeWidth: number = shapes[index].width;
    const shapeHeight: number = shapes[index].height;
    if (cursorX <= shapeWidth / 2) {
      store.dispatch(actions.setPosition(index, String(0), String(cursorY - shapeHeight / 2)));
      return
    }
    if (cursorX >= workSpaceWidth - shapeWidth / 2) {
      store.dispatch(actions.setPosition(index, String(shapeWidth), String(cursorY - shapeHeight / 2)));
      return
    }
    if (cursorY >= workSpaceHeight - shapeHeight / 2) {
      store.dispatch(actions.setPosition(index, String(workSpaceWidth - shapeWidth / 2), String(workSpaceHeight - shapeHeight)));

      return
    }
    if (cursorY <= shapeHeight / 2) {
      store.dispatch(actions.setPosition(index, String(cursorX - shapeWidth / 2), String(0)));
      return
    }
    store.dispatch(actions.setPosition(index, String(cursorX - shapeWidth / 2), String(cursorY - shapeHeight / 2)));
  }

  const mouseUp = (): void => {
    document.body.removeEventListener('mousemove', mouseMove);
    document.body.removeEventListener('mouseup', mouseUp);
    if (refShape.current) {
      refShape.current.firstChild.classList.remove('grabbing');
      refShape.current.firstChild.classList.add('grab');
    }
  }

  return (e: React.MouseEvent): void => {
    e.preventDefault();
    document.body.addEventListener('mousemove', mouseMove);
    document.body.addEventListener('mouseup', mouseUp);
    if (refShape.current) {
      refShape.current.firstChild.classList.add('grabbing');
      refShape.current.firstChild.classList.remove('grab');
    }
    store.dispatch(actions.setSelection(index, refShape));
  }

}