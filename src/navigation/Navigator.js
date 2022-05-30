import React, {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ShopNavigator} from './ShopNavigator';
import {CommonActions} from '@react-navigation/native';

const Navigator = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(CommonActions.navigate({name: 'Products'}));
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default Navigator;
