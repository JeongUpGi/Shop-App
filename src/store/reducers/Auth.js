import {AUTHENTICATE, LOGIN, LOGOUT, SIGNUP} from '../actions/Auth';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // 인증을 위한 action
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    // 로그인을 위한 action
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    // 로그아웃을 위한 action
    case LOGOUT: {
      return {
        initialState,
      };
    }
    // 회원가입을 위한 action
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
