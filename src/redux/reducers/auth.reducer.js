import { authConstant } from "../action/constants";

const initialState = {
  user: undefined,
  isAutorize: false,
  loading: false,
  error: false,
  msg: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case authConstant.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        isAutorize: false,
        error: false,
        msg: "",
      };
      break;
    case authConstant.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAutorize: true,
        error: false,
        msg: "",
        user: action.payload.user,
      };
      break;
    case authConstant.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAutorize: false,
        error: true,
        msg: action.payload.errCode,
      };
      break;
    case authConstant.LOGOUT_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAutorize: false,
        error: false,
        msg: "",
      };
      break;
    case authConstant.LOGOUT_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAutorize: false,
        error: false,
        msg: action.payload.errCode,
      };
      break;

    default:
      return state;
  }
};
