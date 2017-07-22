import styled from 'styled-components';
import media from '../media'

export const GraphLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  padding: 6em 0;

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
  height: 40%;
  width: 40%;
  background-color: white;

  ${media.desktop`
    height: 100%;
    width: 100%;
  `}
`;
