import { onValue, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { database } from "../../firebase-config";
import { cartConstant } from "./constants";
export const addToCart = ({ userData, found }) => {
  // alert("work");
  return async (dispatch) => {
    dispatch({ type: cartConstant.ADD_TO_CART_REQUEST });
    const db = database;
    set(ref(db, `main/carts/${userData?.user?.uid}/ ${found?.key}`), found)
      .then((v) => {
        console.log("response of add to cart", v);
        toast.success("Product Added Successfully...");
        dispatch({ type: cartConstant.ADD_TO_CART_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: cartConstant.ADD_TO_CART_FAILURE });
        toast.error(err?.code ? err.code : "something went wrong..");
        alert("data err");
      });
  };
};

export const getUserCarts = ({ user }) => {
  return async (dispatch) => {
    dispatch({ type: cartConstant.GET_CART_REQUEST });
    console.log("getedcartdata if", user);

    console.log("getedcartdata else", user);
    const starCountRef = ref(database, `main/carts/${user?.uid}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      console.log("getedcartdata1", data);
      if (data) {
        var myData = Object.values(data);
        console.log("getedcartdata2", data);
        dispatch({
          type: cartConstant.GET_CART_SUCCESS,
          payload: { data: myData, noOfCart: myData?.length },
        });
      } else {
        dispatch({
          type: cartConstant.GET_CART_FAILURE,
          payload: { msg: "something went wrong" },
        });
      }
    });
  };
};
