import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  fetchFurnitureView,
  initializeForm,
} from '../../modules/furnitureView';
import FurnitureViewForm from '../../pages/FurnitureView/FurnitureViewForm';

const FurnitureViewFormContainer = () => {
  const dispatch = useDispatch();

  const roomInfo = useSelector(({ furnitureView }) => furnitureView.roomInfo);
  const productList = useSelector(
    ({ furnitureView }) => furnitureView.productList
  );

  useEffect(() => {
    batch(() => {
      dispatch(initializeForm());
      dispatch(fetchFurnitureView());
    });
  }, [dispatch]);

  return <FurnitureViewForm roomInfo={roomInfo} productList={productList} />;
};

export default FurnitureViewFormContainer;
