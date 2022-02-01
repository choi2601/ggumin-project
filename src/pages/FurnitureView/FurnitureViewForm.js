import React from 'react';
import styled from 'styled-components';
import FurnitureFigure from '../../components/common/FurnitureFigure';

const FurnitureViewForm = ({ roomInfo, productList }) => {
  const { id, imageUrl } = roomInfo;

  return (
    <Container>
      <CurrentRoomImageContainer>
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
  & .roomImage {
    width: 800px;
  }
`;

const FurnitureViewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  padding: 0 10px;
`;

export default FurnitureViewForm;
