import React from 'react';
import roundTo from 'round-to';
import { Child, StyledCubeGrid } from './styles';

const CubeGrid = props => {
  const range = 0.4;
  const cubes = [0.5, 0.75, 1, 0.25, 0.5, 0.75, 0, 0.25, 0.5]
    .map(cubeVal => roundTo(range * cubeVal, 2))
    .map((roundedVal, idx) => <Child key={idx * range} delay={roundedVal} />);
  return (
    <StyledCubeGrid {...props}>
      {cubes}
    </StyledCubeGrid>
  );
};

CubeGrid.defaultProps = {
  size: 40,
  color: '#333',
};

export default CubeGrid;
