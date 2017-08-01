import React, { Component } from 'react';
import { string, bool, object, func } from 'prop-types';
import styled from 'styled-components';

import { LoadingWrapper } from './Landing';
import CubeGrid from '../styled/CubeGrid';

const BackgroundImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(0, 128, 128, 0.4),
      rgba(0, 128, 128, 0.4)
    ),
    url('http://images.medicaldaily.com/sites/medicaldaily.com/files/2014/07/04/german-grocery-store-banishes-food-packaging.jpg')
      no-repeat center center fixed;
  background-size: cover;
`;

const AuthPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 400px;
  width: 375px;
  background-color: rgba(255, 255, 255, 0.90);
  border-radius: 5px;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  display: block;
  padding: .75em 0;
  text-align: left;
  font-size: .75em;
  width: 18em;
  color: ${props => (props.valid ? '#000' : '#ff1744')};
  border-bottom: ${props =>
    props.valid ? '.1em solid #9e9e9e' : '.1em solid #ff1744'};
  margin: 1em;
  background-image: ${props => {
    if (props.username) {
      return "url('https://image.flaticon.com/icons/svg/126/126491.svg')";
    } else if (props.password) {
      return "url('https://image.flaticon.com/icons/svg/117/117129.svg')";
    }
    return null;
  }};
  background-repeat: no-repeat;
  background-position: right;
  background-size: 22px;
  &:hover {
    border-bottom-color: ${props =>
      props.valid ? '#000' : '#ff1744'};
  }
  &::selection {
    background: #79ffe1;
  }
  &::placeholder {
    color: #9e9e9e;
  }
  &:focus {
    outline: none;
    border-bottom-color: ${props =>
      props.valid ? 'color: #000' : 'color: #ff1744'};
  }
`;

const LoginError = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  color: #ff1744;
  font-size: .7em;
  margin: .4em 0 0 0;
  font-style: italic;
`;

const SubmitButton = styled.input`
  padding: 10px 110px;
  color: white;
  font-size: .75em;
  background-color: #ff1744;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  margin: 1.5em 0 3em 0;
  text-transform: uppercase;
  box-shadow: 0 3px #999;

  &:hover {
    background-color: #e53935;
  }
  &:focus {
    outline: none;
  }
  &:active {
    background-color: #e53935;
    box-shadow: none;
    transform: translateY(2px);
  }
`;

class Login extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      username: '',
      password: '',
      usernameValid: true,
      passwordValid: true,
      valid: false,
    };
    this.state = this.initialState;
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleKeyPress(evt) {
    if (evt.key === 'Enter') {
      if (
        this.state.valid &&
        this.state.username !== '' &&
        this.state.password !== ''
      ) {
        return this.state.valid
          ? this.props.loginUser({
              username: this.state.username,
              password: this.state.password,
            })
          : (function noop() {})();
      }
    }
    return (function noop() {})();
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      [`${evt.target.name}Valid`]:
        evt.target.name === 'username'
          ? /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/.test(
              evt.target.value,
            )
          : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
              evt.target.value,
            ),
      valid:
        /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/.test(
          evt.target.value,
        ) &&
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
          evt.target.value,
        ),
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.valid) {
      this.props.resetErrorMessage();
      return this.props.loginUser({
        username: this.state.username,
        password: this.state.password,
      });
    }
    return (function noop() {})();
  }
  render() {
    return this.props.fetching
      ? <LoadingWrapper>
          <CubeGrid color="#FF0080" size={50} />
        </LoadingWrapper>
      : <BackgroundImage>
        <AuthPanel>
          <img
            src="http://image.flaticon.com/icons/svg/109/109680.svg"
            alt="Compass Icon"
            style={{
                marginTop: 40,
                height: 70,
                width: 70,
            }}
          />
          <AuthForm
            onSubmit={this.handleSubmit}
            onKeyPress={this.handleKeyPress}
          >
            <StyledInput
              username
              name="username"
              type="text"
              placeholder="username"
              valid={this.state.usernameValid}
              value={this.state.username}
              onChange={this.handleChange}
            />
            <StyledInput
              password
              name="password"
              type="password"
              placeholder="password"
              valid={this.state.passwordValid}
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.props.errorMessage !== '' &&
              <LoginError>
                {this.props.errorMessage}
              </LoginError>}
              <SubmitButton type="submit" value="Submit" />
            </AuthForm>
          </AuthPanel>
        </BackgroundImage>;
  }
}

Login.propTypes = {
  fetching: bool.isRequired,
  loginUser: func.isRequired,
  errorMessage: string.isRequired,
  resetErrorMessage: func.isRequired,
  location: object.isRequired,
};

export default Login;
