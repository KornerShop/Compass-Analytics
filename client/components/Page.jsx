import React from 'react';
import { element, func } from 'prop-types';
import styled from 'styled-components';

import media from '../styled/media';

const Layout = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  background-color: #f3f3f3;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  width: 100%;
  background-color: white;
  box-shadow: 1px 1px 40px 8px rgba(176, 190, 197, 1);
  z-index: 1;

  ${media.tablet`
    justify-content: space-around;
  `};
`;

const LogoutButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: .5em 1.5em .5em 1.5em;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .25);
  border-radius: 1em;
  margin-right: 2em;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, .25);
    transform: translateY(1px);
  }

  &:active {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .25);
    transform: translateY(5px);
  }
`;

const LogoutIcon = styled.img`
  height: 1em;
  width: 1em;

  ${media.tablet`
  `};
`;

const Heading = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-size: 1.05em;
  font-weight: 700;
  letter-spacing: .75em;
  padding-left: 4.5em;
`;

const Page = ({ children, logoutUser }) =>
  <Layout>
    <Header>
      <Heading>Compass Analytics</Heading>
      <LogoutButton onClick={logoutUser}>
        <LogoutIcon
          src="https://image.flaticon.com/icons/svg/157/157938.svg"
          alt="sign out"
        />
      </LogoutButton>
    </Header>
    { children }
  </Layout>;

Page.propTypes = {
  children: element.isRequired,
  logoutUser: func.isRequired,
}
export default Page;
