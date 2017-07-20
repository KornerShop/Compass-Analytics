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
      rgba(0, 0, 128, 0.35),
      rgba(0, 0, 128, 0.35)
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
  height: 500px;
  width: 500px;
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
  margin: 1.5em;
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
  background-size: 25px;
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

const Submit = styled.input`
  padding: 10px 70px;
  color: white;
  font-size: .75em;
  background-color: tomato;
  text-decoration: none;
  border-radius: 20px;
  border: none;
  margin: 2em;
  text-transform: uppercase;
`;

class Auth extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      username: '',
      password: '',
      valid: true,
    };
    this.state = this.initialState;
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onKeyPress(evt) {
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
  render() {
    return (
      <BackgroundImage>
        <AuthPanel>
          <img
            src="http://image.flaticon.com/icons/svg/109/109680.svg"
            alt="Compass Icon"
            style={{
              marginTop: 40,
              height: 80,
              width: 80,
            }}
          />
          <AuthForm
            onSubmit={() => {}}
            onKeyPress={this.onKeyPress}
          >
            <StyledInput
              username
              name="username"
              type="text"
              placeholder="Username"
              valid={this.state.valid}
              value={this.state.username}
              onChange={this.handleChange}
            />
            <StyledInput
              password
              name="password"
              type="text"
              placeholder="Password"
              valid={this.state.valid}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Submit type="submit" value="Submit" />
          </AuthForm>
        </AuthPanel>
      </BackgroundImage>
    );
  }
}

export default Auth;
