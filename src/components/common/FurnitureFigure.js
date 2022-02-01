import produce from 'immer';
import React from 'react';
import styled, { css } from 'styled-components';

const FurnitureFigure = ({
  productId,
  discountRate,
  imageUrl,
  checkCurrentProduct,
  currentSelectedProductInfo,
}) => {
  console.log(productId, currentSelectedProductInfo.productId);
  return (
    <Container active={productId === currentSelectedProductInfo.productId}>
      <ProductFigure
        id={productId}
        imageUrl={imageUrl}
        onClick={checkCurrentProduct}
        active={productId === currentSelectedProductInfo.productId}
      >
        {discountRate !== 0 && (
          <DiscountBadge>
            {discountRate}
            <span>%</span>
          </DiscountBadge>
        )}
      </ProductFigure>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  margin: 0 6px;

  ${({ active }) =>
    active &&
    css`
      background: linear-gradient(163.54deg, #ff659e 8.22%, #f56b30 94.1%);
      margin: 0 4px;
      padding: 2px;
      border-radius: 18px;
    `}
`;

const ProductFigure = styled.figure`
  position: relative;
  width: 106px;
  height: 106px;
  background: url(${({ imageUrl }) => imageUrl}) no-repeat;
  background-position: center center;
  background-size: cover;
  border: 0.5px solid ${({ active }) => (active ? '#fff' : '#aaafb9')};
  border-radius: 16px;
  cursor: pointer;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
  width: 24px;
  height: 28px;
  background: url(./images/icon-discount_badge.png) no-repeat;
  background-position: center center;
  background-size: contain;
  font-size: 11px;
  font-weight: 700;
  line-height: 25px;
  color: #fff;
  text-align: center;
  padding-left: 1px;
`;

export default FurnitureFigure;
