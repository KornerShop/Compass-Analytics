import styled from 'styled-components';
import media from '../media'

export const GraphHeading = styled.h2`
  text-align: left;
  font-weight: 600;
  font-size: .9em;
  letter-spacing: .15em;
  margin-bottom: 1em;
  text-transform: uppercase;
`

export const GraphLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 6em 0;

  ${media.desktop`
    padding: 3em 0;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
  `}

  ${media.tablet`
    padding: 4em 0;
  `}
`;

export const GraphRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
  width: 100%;

  ${media.tablet`
    flex-wrap: wrap;
    margin: 2em 2em -2em 2em;
  `}
`;

export const GraphTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: .15em;
  box-shadow: 13px 12px 40px 2px rgba(176,190,197,1);

  ${media.tablet`
    margin-bottom: 3em;
  `}
`;
