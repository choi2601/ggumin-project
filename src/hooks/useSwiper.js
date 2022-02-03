import { useState, useCallback, useRef } from 'react';

const useSwiper = () => {
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const currentSlideRef = useRef(null);
  const [lastPos, setLastPos] = useState(0);
  const [isScrollMode, setIsScrollMode] = useState(true);
  const [overflowedIndex, setOverflowedIndex] = useState(0);

  const setMousePos = event => {
    const currentMouseMoveSort = event.type;
    const currentMousePosX = event.clientX;

    if (currentMouseMoveSort === 'mousedown')
      setMouseDownClientX(currentMousePosX);
    else setMouseUpClientX(currentMousePosX);
  };

  const setMouseMove = event => {
    if (mouseDownClientX === 0) return;
    setIsScrollMode(false);
    const currentMousePosX = event.clientX;

    const currentMovedMousePosX = mouseDownClientX - currentMousePosX;
    currentSlideRef.current.scrollLeft = currentMovedMousePosX;
  };

  const setCurrentSwipeInfo = useCallback(() => {
    setIsScrollMode(false);

    const dragedValue = Math.abs(mouseDownClientX - mouseUpClientX);

    if (mouseDownClientX !== 0) {
      if (mouseUpClientX < mouseDownClientX && dragedValue > 100) {
        currentSlideRef.current.scrollLeft = lastPos + 106;
        setLastPos(currentSlideRef.current.scrollLeft);
      } else if (mouseUpClientX > mouseDownClientX && dragedValue > 100) {
        currentSlideRef.current.scrollLeft = lastPos - 106;
        setLastPos(currentSlideRef.current.scrollLeft);
      }
    }

    setMouseDownClientX(0);
    setMouseUpClientX(0);
  }, [mouseDownClientX, mouseUpClientX, isScrollMode]);

  const setCurrentScrollInfo = () => {
    setIsScrollMode(true);
    setLastPos(currentSlideRef.current.scrollLeft);
  };

  const setMoveToCurrentSelectedProduct = (
    productList,
    currentSelectedProductId
  ) => {
    setIsScrollMode(false);

    let isMove = false;
    const viewDefaultRange = 6;

    const currentSelectedProductIndex = productList.findIndex(
      ({ productId }) => productId === currentSelectedProductId
    );

    if (
      overflowedIndex < currentSelectedProductIndex &&
      currentSelectedProductIndex >= viewDefaultRange
    ) {
      currentSlideRef.current.scrollLeft = 106 * currentSelectedProductIndex;
      isMove = true;
    } else if (
      overflowedIndex > currentSelectedProductIndex &&
      overflowedIndex - currentSelectedProductIndex >= viewDefaultRange
    ) {
      currentSlideRef.current.scrollLeft = 106 * currentSelectedProductIndex;
      isMove = true;
    }

    isMove && setOverflowedIndex(currentSelectedProductIndex);
  };

  return {
    mouseUpClientX,
    mouseDownClientX,
    currentSlideRef,
    isScrollMode,
    setMousePos,
    setMouseMove,
    setCurrentSwipeInfo,
    setCurrentScrollInfo,
    setMoveToCurrentSelectedProduct,
  };
};

export default useSwiper;
