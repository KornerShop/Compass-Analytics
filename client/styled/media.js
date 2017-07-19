import { css } from 'styled-components';

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  smallTablet: 592,
  phone: 376,
};

export default Object.keys(sizes).reduce((acc, label) => {
  const emSize = sizes[label] / 16;
  acc[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
