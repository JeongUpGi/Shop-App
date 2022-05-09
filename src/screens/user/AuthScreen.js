import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import HeaderBar from '../../components/Global/HeaderBar';
import InputForm from '../../components/UI/InputForm';

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={50}>
      <HeaderBar.centerOnly centerTitle="AuthScreen" />
      <LinearGradient
        colors={['#ffedff', '#ffe3ff']}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AuthWrapper>
          <ScrollView>
            <InputForm
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="올바른 이메일을 입력해주세요."
              onInputChange={() => {}}
              initiallyValid={true}
              initialValue=""
            />
            <InputForm
              id="password"
              label="Password"
              keyboardType="default"
              required
              secureTextEntry
              minLength={5}
              autoCapitalize="none"
              errorText="올바른 비밀번호를 입력해주세요."
              onInputChange={() => {}}
              initiallyValid={true}
              initialValue=""
            />
            <LoginButton onPress={() => {}} activeOpacity={0.5}>
              <ButtonText>Login</ButtonText>
            </LoginButton>
            <SignUpButton onPress={() => {}} activeOpacity={0.5}>
              <ButtonText>Switch to Sign Up</ButtonText>
            </SignUpButton>
          </ScrollView>
        </AuthWrapper>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const AuthWrapper = styled.View`
  margin: 20px;
  width: 80%;
  height: 50%;
  padding: 25px;
  shadow-color: black;
  shadow-opacity: 0.26;
  shadow-radius: 8px;
  elevation: 5;
  border-radius: 10px;
  background-color: white;
`;
const LoginButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.mainColor};
  align-items: center;
  height: 35px;
  justify-content: center;
  border-radius: 10px;
  margin-top: 10px;
`;
const SignUpButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.heartColor};
  align-items: center;
  margin-top: 10px;
  height: 35px;
  justify-content: center;
  border-radius: 10px;
`;
const ButtonText = styled.Text`
  color: white;
  font-family: ${props => props.theme.fonts.pretendFont.regular};
`;

export default AuthScreen;
