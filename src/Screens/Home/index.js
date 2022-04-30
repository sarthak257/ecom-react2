import {
  Button,
  CircularProgress,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../component/Navbar";
import styles from "./Home.module.sass";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ProductCard from "../../component/ProductCard";
import Box from "@mui/material/Box";
import Modal from "../../component/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../../redux/action/product.action";
import LoaderSync from "../../component/LoaderSync";
import {
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref, update, set } from "firebase/database";
import { storage, database } from "../../firebase-config";
import { toast } from "react-toastify";
const Home = () => {
  const initialState = {
    title: "",
    description: "",
    rating: 0,
    price: NaN,
    imageUrl: undefined,
    key: undefined,
  };
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state?.productsData);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateProductData, setUpdateProductData] = useState();
  const [formFieldData, setFormFieldData] = useState(initialState);
  const [file, setFile] = useState();
  const [fileProgress, setFileProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [sorted, setsorted] = useState(false);
  const [sortedArray, setSortedArray] = useState();
  // const [random, setRandom] = useState();
  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);

  useEffect(() => {
    if (productsData) {
      setSortedArray(productsData?.products);
    }
  }, [productsData, sorted]);

  useEffect(() => {
    let sorteds = sortedArray?.sort((a, b) => (a.price > b.price ? 1 : -1));
    setSortedArray(sorteds);
    // setRandom(Math.random() * 10);
  }, [sorted, sortedArray]);

  useEffect(() => {
    if (updateProductData) {
      setFormFieldData((prev) => ({
        ...prev,
        title: updateProductData?.title,
        description: updateProductData?.description,
        price: updateProductData?.price,
        rating: updateProductData?.rating,
        imageUrl: updateProductData?.imageUrl,
        key: updateProductData?.key,
      }));
    }
  }, [updateProductData]);

  const onFileChangeHandler = useCallback(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUpdateProductData((prev) => ({
          ...prev,
          imageUrl: e.target.result,
        }));
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

            default:
              return null;
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
            default:
              return null;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUploaded(false);
            setUpdateProductData((prev) => ({
              ...prev,
              imageUrl: downloadURL,
            }));
            setFormFieldData((prev) => ({
              ...prev,
              imageUrl: downloadURL,
            }));
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
  }, [file]);
  useEffect(() => {
    onFileChangeHandler();
  }, [file, onFileChangeHandler]);
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const updataProduct = (data) => {
    const updates = {};
    setUpdateModalOpen(false);
    updates["main/products/" + formFieldData?.key] = data;
    return update(ref(database), updates)
      .then((v) => {
        toast.success("Updated Product Successfully...");
      })
      .catch((err) => {
        toast.error("Something went wrong...");

        console.log("updataProduct err", err);
      });
  };
  const updateModal = () => {
    return (
      <Modal
        show={updateModalOpen}
        handleClose={handleCloseUpdateModal}
        modalTitle={"Edit Product"}
        buttons={[
          {
            color: "primary",
            label: "Update",
            disabled: uploaded ? true : false,
            onClick: () => {
              updataProduct(formFieldData);
            },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            className={styles.hiddenInputFile}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <img
            src={updateProductData?.imageUrl}
            alt="img"
            style={{ width: "50%", height: "auto" }}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={formFieldData?.title}
            onChange={(e) => {
              setFormFieldData((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={formFieldData?.description}
            onChange={(e) => {
              setFormFieldData((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            type={"number"}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rs</InputAdornment>
              ),
            }}
            value={formFieldData?.price}
            onChange={(e) => {
              setFormFieldData((prev) => ({ ...prev, price: e.target.value }));
            }}
          />
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={formFieldData?.rating}
              onChange={(event, newValue) => {
                setFormFieldData((prev) => ({ ...prev, rating: newValue }));
              }}
            />
          </Box>
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
            <CircularProgress variant="determinate" value={fileProgress} />
          </Box>
        </Box>
      </Modal>
    );
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };
  const deleteProduct = async (data) => {
    // firebase.database().ref(`users/${userUid}/collection/`).remove(item)
    set(ref(database, "main/products/" + data?.key), null)
      .then((v) => {
        setDeleteModalOpen(false);
        toast.success("Deleted Successfully...");
      })
      .catch((err) => {
        console.log("deletes err", err);
      });
  };
  const deleteModal = () => {
    return (
      <Modal
        show={deleteModalOpen}
        handleClose={handleDeleteModal}
        modalTitle={"Delete Product"}
        buttons={[
          {
            color: "danger",
            label: "Delete",
            onClick: () => {
              deleteProduct(updateProductData);
            },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ErrorOutlineRoundedIcon sx={{ fontSize: "90px" }} color="error" />
          <p>Are you sure? </p>
          <p style={{ color: "#9e9e9e" }}>
            You will not be able to recover...{" "}
          </p>
        </Box>
      </Modal>
    );
  };
  return (
    <>
      <div className={styles.homeWrapper}>
        <Navbar />

        <div className={styles.homeBody}>
          <div className={styles.homeHeader}>
            <Button
              variant="contained"
              sx={{ color: "#000" }}
              endIcon={<SortRoundedIcon />}
              onClick={() => {
                setsorted(!sorted);
              }}
            >
              Sort by Price
            </Button>
          </div>
          <Box
            className={styles.boxCardContainer}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // padding: "0 15px",
            }}
            // sx={{ padding: { md: "0 80px 10px 80px", sm: "0 20px 5px 20px" } }}
          >
            {productsData?.loading ? (
              <LoaderSync />
            ) : sorted ? (
              sortedArray?.map((v, i) => {
                return (
                  <div key={v?.key}>
                    <ProductCard
                      data={v}
                      setUpdateProductData={setUpdateProductData}
                      setUpdateModalOpen={setUpdateModalOpen}
                    />
                  </div>
                );
              })
            ) : (
              productsData?.products?.map((v, i) => {
                return (
                  <div key={v?.key}>
                    <ProductCard
                      data={v}
                      setUpdateProductData={setUpdateProductData}
                      setUpdateModalOpen={setUpdateModalOpen}
                      setDeleteModalOpen={setDeleteModalOpen}
                    />
                  </div>
                );
              })
            )}
          </Box>
        </div>
      </div>
      {updateModal()}
      {deleteModal()}
      {/* <ToastContainer /> */}
    </>
  );
};

export default Home;
