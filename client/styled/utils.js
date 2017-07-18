import { css } from 'styled-components';

export const size = (width, height = width) => css`
  width: ${width};
  height: ${height};
`;

export const pxSize = n => size(`${n}px`);

export const propSize = ({ size }) => pxSize(size);

export const propBgColor = ({ color }) => css`
  background-color: ${color};
`;

export const propMargin = ({ margin = 0 }) => css`
  margin: ${margin}px auto;
`;

export const animationDelay = sec => css`
  animation-delay: ${sec}s;
`;

export const propDelay = ({ delay }) => animationDelay(delay);

export const getRange = (n: number) => [...Array(n).keys()];
