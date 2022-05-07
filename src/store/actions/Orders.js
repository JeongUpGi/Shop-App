import Order from '../../models/Order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const setOrders = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://rn-complete-guide-2c5f0-default-rtdb.firebaseio.com/orders/u1.json',
        //method의 default값은 GET (얻어오는 거)
      );
      if (!response.ok) {
        throw new Error('다시 확인해주세요.');
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalPrice,
            new Date(resData[key].date),
          ),
        );
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

//주문화면에서는 카트에 담은 Item들과 총 금액이 필요하므로.
export const addOrder = (cartItems, totalPrice) => {
  const date = new Date();
  return async dispatch => {
    const response = await fetch(
      'https://rn-complete-guide-2c5f0-default-rtdb.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          cartItems,
          totalPrice,
          date: date.toISOString(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('다시 확인해주십시오.');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      id: resData.name,
      orderItems: cartItems,
      totalPrice: totalPrice,
      date: date,
    });
  };
};
