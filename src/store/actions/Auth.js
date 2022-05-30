import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

let timer;

// 로그인한 아이디가 유효한지 판단하기 위한 action
export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
};

// API_KEY는 내 FireBase 프로젝트 웹 API 키를 의미.
export const singUp = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjNRUKn4Q6iJyXsZxh8C3yA7UO1ghu0TQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      console.log('errorMessage:' + errorID);
      let message = '다시 확인해주십시오.';
      if (errorID === 'EMAIL_EXISTS') {
        message = '이메일이 이미 존재합니다.';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjNRUKn4Q6iJyXsZxh8C3yA7UO1ghu0TQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      console.log('errorMessage:' + errorID);
      let message = '다시 확인해주십시오.';
      if (errorID === 'EMAIL_NOT_FOUND') {
        message = '이메일을 찾을 수 없습니다.';
      } else if (errorID === 'INVALID_PASSWORD') {
        message = '비밀번호가 틀립니다.';
      } else if (errorID === 'INVALID_EMAIL') {
        message = '유효하지 않은 이메일입니다.';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    // 로그인 할 때 loginAction을 하는게 아니라 authenticate를 하면서 자동로그인 검증.
    // loginAction을 하면 또 요청을 하게 되고 검증하려는 이메일, userId가 달라질수 있기에..
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
