import styled from 'styled-components';
import media from '../media'

export const GraphLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2em;

  ${media.desktop`
    padding: 2em;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
  `}
`;

export const GraphTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-end;
  height: 50%;
  width: 50%;

  ${media.desktop`
    height: 100%;
    width: 100%;
  `}
`;
