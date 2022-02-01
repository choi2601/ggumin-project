import React from 'react';
import FurnitureViewTemplate from './FurnitureViewTemplate';
import FurnitureViewFormContainer from '../../containers/FurnitureView/FurnitureViewFormContainer';

const FurnitureViewPage = () => {
  return (
    <FurnitureViewTemplate>
      <FurnitureViewFormContainer />
    </FurnitureViewTemplate>
  );
};

export default FurnitureViewPage;
