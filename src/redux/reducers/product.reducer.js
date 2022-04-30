import { todosConstants } from "../action/constants";

const initialState = {
  products: [],
  productsObj: [],
  loading: false,
  error: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case todosConstants.GET_RECORD_REQUESTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case todosConstants.GET_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        productsObj: action?.payload?.data,
        products: Object?.values(action?.payload?.data),
        error: false,
      };
      break;
    case todosConstants.GET_RECORD_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: true,
      };
      break;

    default:
      return state;
  }
};
