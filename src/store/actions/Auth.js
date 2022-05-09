export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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
      let message = '다시 확인해주십시오.';
      if (errorID === 'EMAIL_EXISTS') {
        message = '이메일이 이미 존재합니다.';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({type: SIGNUP});
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
      let message = '다시 확인해주십시오.';
      if (errorID === 'EMAIL_NOT_FOUND') {
        message = '이메일을 찾을 수 없습니다.';
      } else if (errorID === 'INVALID_PASSWORD') {
        message = '비밀번호가 틀립니다.';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({type: LOGIN});
  };
};
