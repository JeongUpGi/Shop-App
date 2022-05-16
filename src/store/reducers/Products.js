import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/Product';
import {DELETE_PRODUCT, SET_PRODUCTS} from '../actions/Products';
import {ADD_PRODUCT} from '../actions/Products';
import {UPDATE_PRODUCT} from '../actions/Products';

const initialState = {
  availableProducts: [],
  //전체 상품들 ==> model폴더에서 정의한 상품들로 지정
  userProducts: [],
  //사용자의 상품들 ==> model폴더에서 정의한 상품들의 유저 아이디로 지정
  //예시: userProducts는 예제로 어떤 상품 지정. 어떤 상품? -> 상품의 사용자 아이디가 u1인 상품.
};

//reducer에서 action에 대한 정의부분은 action폴더에서 dispatch에서 정의한 부분이 해당됨.
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    //Product 추가
    case ADD_PRODUCT:
      const newProduct = new Product(
        action.id,
        action.ownerID,
        action.title,
        action.imageUrl,
        action.description,
        action.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    //Product (정보) 변경
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        product => product.id === action.productId,
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerID,
        action.title,
        action.imageUrl,
        action.description,
        action.price,
      );
      // 기존의 userProducts(owner의 상품)를 복사한 뒤 수정하려는 제품 아이디의 index의 상품을 수정한 정보로 변경.
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productIndex] = updatedProduct;
      const updatedAvailableProduct = [...state.availableProducts];
      updatedAvailableProduct[productIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProduct,
        userProducts: updatedUserProduct,
      };
    //Product 삭제
    case DELETE_PRODUCT:
      return {
        ...state,
        //action.productId는 Delete를 하는 Product를 뜻함. 그래서 그거만 빼고 filter로 새로운 product들 반환.
        userProducts: state.userProducts.filter(
          product => product.id !== action.productId,
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.productId,
        ),
      };
  }
  return state;
};
