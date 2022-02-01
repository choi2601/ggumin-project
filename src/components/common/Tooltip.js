import React from 'react';
import styled, { css } from 'styled-components';

const Tooltip = ({ currentSelectedProductInfo }) => {
  return (
    <Container>
      <ProductThumbnail imageUrl={currentSelectedProductInfo.imageUrl} />
      <ProductSubInfo>
        <div className="productName">
          {currentSelectedProductInfo.productName}
        </div>
        <ProductPrice>
          <PriceDiscount outside={currentSelectedProductInfo.outside}>
            <span className="discount">
              {currentSelectedProductInfo.outside
                ? '예상가'
                : currentSelectedProductInfo.discountRate + '%'}
            </span>
            {currentSelectedProductInfo.outside
              ? currentSelectedProductInfo.priceOriginal.toLocaleString()
              : currentSelectedProductInfo.priceDiscount.toLocaleString()}
          </PriceDiscount>
        </ProductPrice>
      </ProductSubInfo>
      <MoveButton>
        <img className="moveIcon" alt="moveIcon" src="./images/icon-move.png" />
      </MoveButton>
    </Container>
  );
};

const Container = styled.span`
  display: flex;
  position: absolute;
  top: unset;
  bottom: 52px;
  left: -160px;
  background-color: rgba(255, 255, 255, 0.95);
  width: 220px;
  height: 86px;
  padding: 8px 0 8px 8px;
  margin-top: 16px;
  border-radius: 7px;
  box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 20%);
  font-size: 14px;
  color: #4a4a4a;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    top: unset;
    right: 34px;
    bottom: -8px;
    left: unset;
    transform: rotate(180deg);
    width: 12px;
    height: 8px;
    background: url(./images/icon-triangle.png) no-repeat;
    background-size: cover;
    z-index: 1100;
  }
`;

const ProductThumbnail = styled.div`
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  margin-right: 8px;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`;

const ProductSubInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 2px;
  overflow: hidden;
  text-align: left;

  & .productName {
    width: 100%;
    color: #333c45;
    text-overflow: ellipsis;
    line-height: 1.3em;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const PriceDiscount = styled.div`
  display: flex;
  align-items: center;
  color: #181d1f;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2em !important;

  ${({ outside }) =>
    outside
      ? css`
          & .discount {
            color: #898f94;
            font-size: 12px;
            font-weight: 600;
            margin-right: 5px;
          }
        `
      : css`
          & .discount {
            font-size: 16px;
            font-weight: 700;
            margin-right: 5px;
            color: #ff585d;
          }
        `}
`;

const MoveButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-right: 2px;

  & .moveIcon {
    width: 20px;
    height: 20px;
  }
`;

export default Tooltip;
