import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';

import * as authActions from '../../store/actions/Auth';

import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBar from '../../components/Global/HeaderBar';
import InputForm from '../../components/UI/InputForm';

const spinnerColor = 'rgb(136,95,255)';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    return {
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.singUp(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      if (!isSignup) {
        props.navigation.replace('productsOverView');
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      setError(null);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('오류가 발생했습니다.', error, [{text: '네'}]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={1}>
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
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <InputForm
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="올바른 이메일을 입력해주세요."
              onInputChange={inputChangeHandler}
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
              onInputChange={inputChangeHandler}
              initiallyValid={true}
              initialValue=""
            />
            {isLoading ? (
              <View style={{height: 35, marginTop: 10}}>
                <ActivityIndicator size="small" color={spinnerColor} />
              </View>
            ) : (
              <LoginButton onPress={authHandler} activeOpacity={0.5}>
                <ButtonText>{isSignup ? 'Sign Up' : 'Login'}</ButtonText>
              </LoginButton>
            )}
            <SignUpButton
              onPress={() => {
                setIsSignup(!isSignup);
              }}
              activeOpacity={0.5}>
              <ButtonText>
                Switch to {isSignup ? 'Login' : 'Sign Up'}
              </ButtonText>
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
