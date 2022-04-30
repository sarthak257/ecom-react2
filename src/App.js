import { onAuthStateChanged } from "firebase/auth";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoaderSync from "./component/LoaderSync";
import { auth } from "./firebase-config";
import PrivateRoute from "./PrivateRoute";
import { getUserCarts, togleAuthorize } from "./redux/action";
import AddProduct from "./Screens/AddProduct";
import ResetPassword from "./Screens/ResetPassword";
// import Carts from "./Screens/Carts";
// import Item from "./Screens/Item";
// import SignIn from "./Screens/Signin";
// import Signup from "./Screens/Signup";
import "./styles.sass";

const Home = lazy(() => import("./Screens/Home"));
const Carts = lazy(() => import("./Screens/Carts"));
const Item = lazy(() => import("./Screens/Item"));
const SignIn = lazy(() => import("./Screens/Signin"));
const Signup = lazy(() => import("./Screens/Signup"));
function App() {
  const [authorization, setauthorization] = useState(true);

  const dispatch = useDispatch();
  const signinUser = useSelector((state) => state.userAuth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("userss", user);
        setauthorization(false);
        dispatch(togleAuthorize(user));

        // ...
      } else {
        setauthorization(false);
        // User is signed out
        // ...
      }
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUserCarts({ user: signinUser?.user }));
  }, [signinUser, dispatch]);

  return (
    <>
      <Suspense fallback={<LoaderSync />}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute
                  user={signinUser?.isAutorize}
                  authorizing={authorization}
                  redirectPath="/signin"
                  uid={auth?.currentUser?.uid}
                >
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/item/:id"
              element={
                <PrivateRoute
                  user={signinUser?.isAutorize}
                  authorizing={authorization}
                  redirectPath="/signin"
                  uid={auth?.currentUser?.uid}
                >
                  <Item />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <PrivateRoute
                  user={signinUser?.isAutorize}
                  authorizing={authorization}
                  redirectPath="/signin"
                  uid={auth?.currentUser?.uid}
                >
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute
                  user={signinUser?.isAutorize}
                  authorizing={authorization}
                  redirectPath="/signin"
                  uid={auth?.currentUser?.uid}
                >
                  <Carts />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
