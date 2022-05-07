import Product from '../../models/Product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

//세팅?
export const setProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://rn-complete-guide-2c5f0-default-rtdb.firebaseio.com/products.json`,
        //method의 속성 중 GET은 default값이라 생략 가능. 또한 GET은 header를 설정할 필요 X.
        //즉, GET으로 사용 시 두번 째 인자를 전달할 필요가 X
      );
      if (!response.ok) {
        throw new Error('다시 확인해주세요.');
      }

      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide-2c5f0-default-rtdb.firebaseio.com/products/${productId}.json/`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('다시 확인해주십시오.');
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};

// async, await 비동기처리를 위한 JS최근 문법으로 콜백을 사용한 것과 같음.

export const addProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // fetch ==> HTTP에 요청한 정보를 fetch라는 api를 통해 가져올 수 있음.
    const response = await fetch(
      //firebase에서 products라는 폴더가 생김.
      `https://rn-complete-guide-2c5f0-default-rtdb.firebaseio.com/products.json`,
      {
        //method -> 전달 방식.
        method: 'POST',
        //헤더식별자 == 키? -> Content-type / application/json은 firebase에 JSON을 보내려고 하는 것을 알리는 것.
        headers: {'Content-Type': 'application/json'},
        //이 요청에 추가할 데이터에 대한 본문. JSON문자열로 변환.
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      },
    );

    // response개체에 대해 기다려야 할 비동기 작업이므로 await..?
    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      id: resData.name,
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return async dispatch => {
    //``은 동적 데이터를 주입할 수 있는 문자열! ''과 다름.
    const response = await fetch(
      `https://rn-complete-guide-2c5f0-default-rtdb.firebaseio.com/products/${id}.json/`,
      {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('다시 확인해주십시오.');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    });
  };
};
