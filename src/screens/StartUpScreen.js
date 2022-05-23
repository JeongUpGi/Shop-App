import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authActions from '../store/actions/Auth';
import styled from 'styled-components';

const spinnerColor = 'rgb(136,95,255)';
const StartUpScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    //이는 이미 로그인을 한 상태라면 유지하기 위한 함수로 dispatch로 login을 호출하는게 아니라 authenticate호출.
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      console.log('userData:' + userData);

      if (!userData) {
        props.navigation.replace('auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.replace('auth');
        return;
      }
      props.navigation.replace('productsOverView');
      dispatch(authActions.authenticate(userId, token));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <Container>
      <ActivityIndicator size="large" color={spinnerColor} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default StartUpScreen;
