import React from 'react';
import styled from 'styled-components';

const FurnitureViewTemplate = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export default FurnitureViewTemplate;
