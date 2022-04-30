import productReducer from "./product.reducer";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
// import userReducer from "./user.reducer";
// import productReducer from "./product.reducer";
// import categoryReducer from "./category.reducer";
// import orderReducer from "./order.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  productsData: productReducer,
  userAuth: authReducer,
  cartReducer: cartReducer,
});
export default rootReducer;
