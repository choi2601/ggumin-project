import React from 'react';
import styled from 'styled-components';
import FurnitureFigure from '../../components/common/FurnitureFigure';

const FurnitureViewForm = ({
  roomInfo,
  productList,
  checkCurrentProduct,
  currentSelectedProductInfo,
}) => {
  const { id, imageUrl } = roomInfo;

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
            </TagButton>
          );
        })}
        <img className="roomImage" id={id} alt="roomImage" src={imageUrl} />
      </CurrentRoomImageContainer>
      <FurnitureViewContainer>
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
  & .roomImage {
    width: 800px;
  }
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
  margin-top: 28px;
  padding: 0 10px;
  overflow: scroll;
`;

export default FurnitureViewForm;
