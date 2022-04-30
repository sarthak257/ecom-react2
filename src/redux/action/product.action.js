// import axios from "../../helpers/axios";
import { todosConstants, authConstant } from "./constants";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { database } from "../../firebase-config";
import { toast } from "react-toastify";
export const getProductData = () => {
  // alert("work");
  return async (dispatch) => {
    dispatch({ type: todosConstants.GET_RECORD_REQUESTS });
    // dispatch({ type: todosConstants.ADD_RECORD_SUCCESS });

    try {
      const db = database;
      const starCountRef = ref(db, "main/products");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // updateStarCount(postElement, data);
        if (data) {
          dispatch({
            type: todosConstants.GET_RECORD_SUCCESS,
            payload: { data },
          });
        } else {
          dispatch({ type: todosConstants.GET_RECORD_FAILURE });
        }
      });
    } catch (error) {
      dispatch({ type: todosConstants.GET_RECORD_FAILURE });
      alert("something went wrong");
      console.log("err getproductdata", error);
    }
  };
};
