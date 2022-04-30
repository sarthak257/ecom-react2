import { cartConstant } from "../action/constants";

const initialState = {
  carts: [],
  loading: false,
  error: false,
  noOfCart: 0,
  msg: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case cartConstant.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        msg: "",
      };
      break;
    case cartConstant.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        msg: "",
      };
      break;
    case cartConstant.ADD_TO_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        msg: action.payload.errCode,
      };
      break;
    case cartConstant.GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
        carts: [],
        noOfCart: 0,
        error: false,
        msg: "",
      };
      break;
    case cartConstant.GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        carts: action?.payload?.data,
        noOfCart: action?.payload?.noOfCart,
        error: false,
        msg: "",
      };
      break;
    case cartConstant.GET_CART_FAILURE:
      return {
        ...state,
        loading: false,
        carts: [],
        noOfCart: 0,
        error: true,
        msg: action.payload.errCode,
      };
      break;

    default:
      return state;
  }
};
