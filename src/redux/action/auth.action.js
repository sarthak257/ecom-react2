// import axios from "../../helpers/axios";
import { authConstant } from "./constants";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { auth, database } from "../../firebase-config";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const signinUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.AUTH_REQUEST });
    // dispatch({ type: todosConstants.ADD_RECORD_SUCCESS });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // setErr(false);
        // seterrMsg("");
        toast.success("Login Successfully...");
        dispatch({ type: authConstant.AUTH_SUCCESS, payload: { user } });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;

        // setErr(true);
        // seterrMsg(errorCode);
        dispatch({
          type: authConstant.AUTH_FAILURE,
          payload: { errCode: errorCode },
        });
      });
  };
};
export const registerUser = () => {
  // alert("work");
  return async (dispatch) => {
    dispatch({ type: authConstant.AUTH_REQUEST });
    // dispatch({ type: todosConstants.ADD_RECORD_SUCCESS });
  };
};
export const singupUser = () => {
  // alert("work");
  return async (dispatch) => {
    dispatch({ type: authConstant.AUTH_REQUEST });
    // dispatch({ type: todosConstants.ADD_RECORD_SUCCESS });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_AUTH_REQUEST });
    signOut(auth)
      .then(() => {
        dispatch({ type: authConstant.LOGOUT_AUTH_SUCCESS });
        // Sign-out successful.
        toast.success("User logout successfully...");
      })
      .catch((error) => {
        dispatch({
          type: authConstant.LOGOUT_AUTH_FAILURE,
          payload: { errCode: error.code },
        });
        toast.error(error?.code ? error.code : "something went wrong");
        // An error happened.
      });
  };
};

export const togleAuthorize = (user) => {
  // alert("work");

  return async (dispatch) => {
    dispatch({
      type: authConstant.AUTH_SUCCESS,
      payload: { user: user },
    });

    // dispatch({ type: todosConstants.ADD_RECORD_SUCCESS });
  };
};
