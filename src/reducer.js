export const initialState = {
  basket: [],
  user: null,
  dbUser: null,
  products: [
    {
      key: 1,
      name: "test",
    },
  ],
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

function reducer(state, action) {
  //console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        dbUser: action.dbUser,
      };

    //break;
    case "ADD_TO_BASKET":
      //Add item to basket
      return { ...state, basket: [...state.basket, action.item] };
    //break;

    case "REMOVE_FROM_BASKET":
      //Remove item from basket

      let newBasket = [...state.basket];

      const i = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      if (i >= 0) {
        //Item exists - remove it
        newBasket.splice(i, 1);
      } else {
        console.warn("Cant remove product, not found in basket");
      }

      return { ...state, basket: newBasket };
    //break;

    default:
      return state;
  }
}

export default reducer;
