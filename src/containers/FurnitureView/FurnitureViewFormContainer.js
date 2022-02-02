import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  fetchFurnitureView,
  initializeForm,
  registerCurrentCheckedProduct,
  deleteCurrentCheckedProduct,
} from '../../modules/furnitureView';
import FurnitureViewForm from '../../pages/FurnitureView/FurnitureViewForm';

const FurnitureViewFormContainer = () => {
  const dispatch = useDispatch();

  const roomInfo = useSelector(({ furnitureView }) => furnitureView.roomInfo);
  const productList = useSelector(
    ({ furnitureView }) => furnitureView.productList
  );
  const currentSelectedProductInfo = useSelector(
    ({ furnitureView }) => furnitureView.currentSelectedProductInfo
  );

  const checkCurrentProduct = event => {
    const productId = event.target.id;

    if (currentSelectedProductInfo.productId) {
      dispatch(deleteCurrentCheckedProduct());

      if (currentSelectedProductInfo.productId !== Number(productId))
        dispatch(registerCurrentCheckedProduct(productId));
    } else dispatch(registerCurrentCheckedProduct(productId));
  };

  useEffect(() => {
    batch(() => {
      dispatch(initializeForm());
      dispatch(fetchFurnitureView());
    });
  }, [dispatch]);

  return (
    <FurnitureViewForm
      roomInfo={roomInfo}
      productList={productList}
      checkCurrentProduct={checkCurrentProduct}
      currentSelectedProductInfo={currentSelectedProductInfo}
    />
  );
};

export default FurnitureViewFormContainer;
