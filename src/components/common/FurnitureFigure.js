import React from 'react';
import styled from 'styled-components';

const FurnitureFigure = ({
  productId,
  discountRate,
  imageUrl,
  checkCurrentProduct,
}) => {
  return (
    <ProductFigure
      className="productFigure"
      id={productId}
      imageUrl={imageUrl}
      onClick={checkCurrentProduct}
    >
      {discountRate !== 0 && (
        <DiscountBadge>
          {discountRate}
          <span>%</span>
        </DiscountBadge>
      )}
    </ProductFigure>
  );
};

const ProductFigure = styled.figure`
  position: relative;
  width: 106px;
  height: 106px;
  margin: 0 6px;
  background: url(${({ imageUrl }) => imageUrl}) no-repeat;
  background-position: center center;
  background-size: cover;
  border: 0.5px solid #aaafb9;
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
