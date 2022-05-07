import Order from '../../models/Order';
import {ADD_ORDER, SET_ORDERS} from '../actions/Orders';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.id,
        action.orderItems,
        action.totalPrice,
        action.date,
      );

      // state.orders --> 해당 프로젝트의 전체적인 state에서 orders로 진입
      // orders는 reducer로 넣어준 Orders.js 감속기 파일.
      return {...state, orders: state.orders.concat(newOrder)};
  }

  return state;
};
