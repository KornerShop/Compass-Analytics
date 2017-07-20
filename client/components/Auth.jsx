/*
TO-DO:
- get comfortable w/ button style
- Validate inputs (see NYT react)
- Input shakes horizontally on submission if not valid
- Just clear for now on valid submission
- Move onto Auth0 redux example
- React router auth routes
 */

import React, { Component } from 'react';
import styled from 'styled-components';

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
  height: 425px;
  width: 375px;
  background-color: rgba(255, 255, 255, 0.90);
  border-radius: 5px;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  display: block;
  padding: .75em 0;
  text-align: left;
  font-size: .75em;
  width: 18em;
  color: ${props => (props.valid ? '#000' : '#FF0080')};
  border-bottom: ${props =>
    props.valid ? '.1em solid #9e9e9e' : '.1em solid #FF0080'};
  margin: 1em;
  background-image: ${props => {
    if (props.username) {
      return "url('https://image.flaticon.com/icons/svg/126/126491.svg')"
    } else if (props.password) {
      return "url('https://image.flaticon.com/icons/svg/117/117129.svg')"
    }
    return null
  }};
  background-repeat: no-repeat;
  background-position: right;
  background-size: 22px;
  &:hover {
    border-bottom-color: ${props =>
      props.valid ? '#000' : '#FF0080'};
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
      props.valid ? 'color: #000' : 'color: #FF0080'};
  }
`;

const SubmitButton = styled.input`
  padding: 10px 110px;
  color: white;
  font-size: .75em;
  background-color: #ff1744;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  margin: 2em 0 3em 0;
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

class Auth extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      username: '',
      password: '',
      usernameValid: true,
      passwordValid: true,
      valid: true
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
        this.setState({
          username: '',
          password: '',
          valid: false,
        });
      }
    }
  }
  handleChange(evt) {
    this.setState({
      valid:
        this.usernameInput.value.length > 2 &&
        this.passwordInput.value.length > 3,
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.setState(this.initialState);
  }
  render() {
    return (
      <BackgroundImage>
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
              placeholder="Username"
              valid={this.state.usernameValid}
              value={this.state.username}
              onChange={this.handleChange}
            />
            <StyledInput
              password
              name="password"
              type="text"
              placeholder="Password"
              valid={this.state.valid}
              value={this.state.passwordValid}
              onChange={this.handleChange}
            />
            <SubmitButton type="submit" value="Submit" />
          </AuthForm>
        </AuthPanel>
      </BackgroundImage>
    );
  }
}

export default Auth;
