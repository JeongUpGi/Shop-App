import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/Cart';
import {ADD_ORDER} from '../actions/Orders';
import CartItem from '../../models/Cart-item';
import {DELETE_PRODUCT} from '../actions/Products';

const initialState = {
  items: {},
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // addedProduct라는 변수는 action을 통한 상품을 의미. ( 여기에서 action이란 상품에 추가하는 행위 )
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      // 현재 items에 추가한 item이 존재하는지 --> 추가하는 item의 id로 판별.
      if (state.items[addedProduct.id]) {
        // state.items[addedProduct.id] --> 추가한 상품의 id를 키값으로 설정해서 items를 찾는 것.
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
        return {
          ...state,
          items: {...state.items, [addedProduct.id]: updatedCartItem},
          totalPrice: state.totalPrice + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: {...state.items, [addedProduct.id]: newCartItem},
          // addedProduct.id --> 키설정.. 추가되었다는 것을 의미.
          totalPrice: state.totalPrice + prodPrice,
        };
      }
    // remove같은 경우 한 상품에 대해서만 정의를 하는 경우이므로 updatedCartItems라는 변수를 만들어준거임.
    // if문 안에 const로 정의한 updatedCartItem이 return에서 쓰일 수 없으므로
    case REMOVE_FROM_CART:
      //현재 선택한 아이템의 개수를 의미하는 변수.
      const currentQuantity = state.items[action.productId].quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        //state.items[action.productId] = 제거하려는(선택한)아이템
        const updatedCartItem = new CartItem(
          state.items[action.productId].quantity - 1,
          state.items[action.productId].prodPrice,
          state.items[action.productId].prodTitle,
          state.items[action.productId].sum -
            state.items[action.productId].prodPrice,
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        // 전에 let변수를 사용하는게 아니라 const변수로 새로 지정해서 사용했는데 이는 당연히 새로운 변수를 지정했기에
        // 후에 return시 아무것도 안남을수 밖에 없음...
        // 여기서는 updatedCartItem(단수)를 안 쓰는 이유 어차피 수량이 하나라 제거 시 싹 삭제해버리면 되므로.
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalPrice: state.totalPrice - state.items[action.productId].prodPrice,
      };
    //주문하기 action시 cart에 있는 item들에 대한 정보는 초기상태로 돌림.
    //단, order를 한 item은 order부분에서는 유지.
    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      // cartItems들중에 DELETE_PRODUCT를 수행한 Product가 있다면!
      if (state.items[action.productId]) {
        const updatedItems = {...state.items};
        // cartItems들에서 DELETE_PRODUCT를 수행한 Product 삭제.
        delete updatedItems[action.productId];
        const deleteTotalPrice = state.items[action.productId].sum;
        return {
          ...state,
          items: updatedItems,
          totalPrice: state.totalPrice - deleteTotalPrice,
        };
      }
  }

  return state;
};
