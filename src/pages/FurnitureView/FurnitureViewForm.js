import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FurnitureFigure from '../../components/common/FurnitureFigure';
import Tooltip from '../../components/common/Tooltip';
import useSwiper from '../../hooks/useSwiper';

const FurnitureViewForm = ({
  roomInfo,
  productList,
  checkCurrentProduct,
  currentSelectedProductInfo,
}) => {
  const [currentRoomViewSize, setCurrentRoomViewSize] = useState({
    width: 0,
    height: 0,
  });
  const {
    mouseUpClientX,
    currentSlideRef,
    isScrollMode,
    setMousePos,
    setMouseMove,
    setCurrentSwipeInfo,
    setCurrentScrollInfo,
    setMoveToCurrentSelectedProduct,
  } = useSwiper();

  const roomView = useRef(null);

  const { id, imageUrl } = roomInfo;

  useLayoutEffect(() => {
    const roomViewWidth = roomView.current.width;
    const roomViewHeight = roomView.current.height;

    setCurrentRoomViewSize({
      ...currentRoomViewSize,
      width: roomViewWidth,
      height: roomViewHeight,
    });
  }, [imageUrl]);

  useLayoutEffect(() => {
    mouseUpClientX && setCurrentSwipeInfo();
  }, [mouseUpClientX]);

  useLayoutEffect(() => {
    currentSelectedProductInfo &&
      setMoveToCurrentSelectedProduct(
        productList,
        currentSelectedProductInfo.productId
      );
  }, [currentSelectedProductInfo]);

  return (
    <Container>
      <CurrentRoomImageContainer>
        {productList.map(({ productId, pointX, pointY }, index) => {
          return (
            <TagButton key={index} pointX={pointX} pointY={pointY}>
              <img
                id={productId}
                className="tagImage"
                alt="tagImage"
                src={`${
                  currentSelectedProductInfo.productId === productId
                    ? './images/icon-tag_delete.png'
                    : './images/icon-tag_search.png'
                }`}
                onClick={checkCurrentProduct}
              />
              {productId === currentSelectedProductInfo.productId && (
                <Tooltip
                  currentRoomViewSize={currentRoomViewSize}
                  currentSelectedProductInfo={currentSelectedProductInfo}
                />
              )}
            </TagButton>
          );
        })}
        <img
          className="roomImage"
          id={id}
          alt="roomImage"
          src={imageUrl}
          ref={roomView}
          style={{ height: '998px' }}
        />
      </CurrentRoomImageContainer>
      <FurnitureViewContainer
        onMouseDown={setMousePos}
        onMouseUp={setMousePos}
        onMouseMove={setMouseMove}
        onWheel={setCurrentScrollInfo}
        ref={currentSlideRef}
        isScrollMode={isScrollMode}
      >
        <SlideWrapper>
          {productList.map(({ productId, discountRate, imageUrl }, index) => {
            return (
              <FurnitureFigure
                key={index}
                productId={productId}
                discountRate={discountRate}
                imageUrl={imageUrl}
                checkCurrentProduct={checkCurrentProduct}
                currentSelectedProductInfo={currentSelectedProductInfo}
              />
            );
          })}
        </SlideWrapper>
      </FurnitureViewContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const CurrentRoomImageContainer = styled.div`
  position: relative;
`;

const TagButton = styled.div`
  position: absolute;
  top: ${({ pointX }) => pointX + pointX * 0.6}px;
  left: ${({ pointY }) => pointY + pointY * 0.63}px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  & .tagImage {
    width: 32px;
    height: 32px;
  }
`;

const FurnitureViewContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  scroll-behavior: smooth;
  transition: transform 0.6s ease-out;

  ${({ isScrollMode }) =>
    !isScrollMode &&
    css`
      &::-webkit-scrollbar {
        display: none;
      }
    `}
`;

const SlideWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export default FurnitureViewForm;
