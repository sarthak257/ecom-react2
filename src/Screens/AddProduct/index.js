import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  LinearProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
// import React from "react";
import Navbar from "../../component/Navbar";
import styles from "./AddProduct.module.sass";
import { ref, onValue, set, child, push, getDatabase } from "firebase/database";
import {
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";

import { database, storage } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [fileProgress, setFileProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const initialState = {
    title: "",
    description: "",
    rating: 0,
    price: NaN,
    imageUrl: undefined,
  };
  const [productData, setProductData] = useState(initialState);
  const addProductData = (e, data) => {
    e.preventDefault();
    const db = database;
    const newPostKey = push(child(ref(db), "posts")).key;
    set(ref(db, "main/products/" + newPostKey), {
      title: data?.title,
      description: data?.description,
      rating: data?.rating,
      price: data?.price,
      imageUrl: data?.imageUrl,
      key: newPostKey,
    })
      .then((v) => {
        toast.success("Product Added Successfully...");
        navigate("/");
      })
      .catch((err) => {
        alert("data err");
      });
  };

  const onFileChangeHandler = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductData((prev) => ({ ...prev, imageUrl: e.target.result }));
      };
      reader.readAsDataURL(file);
      // Create the file metadata
      let abc = Math.random() * 100;
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = refStorage(
        storage,
        "images/" + file.name + abc.toFixed(0)
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploaded(true);
          setFileProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              // alert("img upload pause")
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUploaded(false);
            setProductData((prev) => ({ ...prev, imageUrl: downloadURL }));
          });
        }
      );
      // setAvatarChanged(true);
      // formik.setFieldValue("avatar", event.target.files[0]);
      // if (IMAGE_TYPES.includes(event.target.files[0].type)) {
      // if (event.target.files.length !== 0) {

      // }
      // } else {
      //   toast("Not Supported Format.", { type: "warning" });
      // }
    }
  };
  useEffect(() => {
    onFileChangeHandler();
  }, [file]);

  return (
    <div className={styles.itemWrapper}>
      <Navbar />
      <div className={styles.itemCardWrapper}>
        <Box
          sx={{
            width: { md: "75%" },
            maxWidth: { md: "1000px" },
            boxShadow: "0px 0px 8px 1px #607d8b",
            borderRadius: "15px",
            padding: "50px",
            position: "relative",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            validate
            autoComplete="off"
            onSubmit={(e) => addProductData(e, productData)}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: "30px", fontWeight: "500" }}
            >
              Add a Product
            </Typography>
            <TextField
              id="outlined-basic"
              label="Title"
              required
              variant="outlined"
              value={productData?.title}
              onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              required
              value={productData?.description}
              onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
            <TextField
              id="outlined-basic"
              label="Price"
              required
              type={"number"}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs</InputAdornment>
                ),
              }}
              value={productData?.price}
              onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  price: e.target.value,
                }));
              }}
            />
            <Box>
              <Grid container spacing={2}>
                <Grid
                  item
                  md={6}
                  sm={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="outlined-basic"
                    // label="Description"
                    type={"file"}
                    // value={productData?.description}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    required
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      left: 0,
                      top: 0,
                      // display: "flex !important",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#9e9e9e63",
                      zIndex: 500,
                      display: !uploaded ? "none" : "flex",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={fileProgress}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  md={6}
                  sm={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={productData?.imageUrl}
                    alt="img"
                    width={150}
                    height={150}
                    style={{ objectFit: "cover" }}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* <Box>
              <LinearProgress variant="determinate" value={0} />
            </Box> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={productData?.rating}
                  required
                  onChange={(event, newValue) => {
                    setProductData((prev) => ({ ...prev, rating: newValue }));
                  }}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  type={"submit"}
                  // onClick={() => {
                  //   addProductData(productData);
                  // }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddProduct;
