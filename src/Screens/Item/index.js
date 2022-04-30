import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar";
import styles from "./Item.module.sass";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../../redux/action/product.action";
import LoaderSync from "../../component/LoaderSync";
import { database } from "../../firebase-config";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action";
const Item = () => {
  const { id } = useParams();
  const db = database;
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state?.productsData);
  const userData = useSelector((state) => state?.userAuth);
  useEffect(() => {
    if (productsData) {
      dispatch(getProductData());
    }
  }, []);
  const found = productsData?.products.find((element) => element.key == id);

  const addingToCart = () => {
    dispatch(addToCart({ userData, found }));
  };
  console.log("iddd found", found);
  console.log("iddd userData", userData);
  return (
    <>
      <div className={styles.itemWrapper}>
        <Navbar />
        <div className={styles.itemCardWrapper}>
          {productsData?.loading ? (
            <LoaderSync />
          ) : (
            <Box
              sx={{
                width: { md: "75%" },
                maxWidth: { md: "1000px" },
                boxShadow: "0px 0px 8px 1px #607d8b",
                borderRadius: "15px",
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  md={6}
                  sm={12}
                  sx={{
                    backgroundColor: "#eceff1",
                    borderTopLeftRadius: { md: "15px" },
                    borderBottomLeftRadius: { md: "15px" },
                  }}
                >
                  <img
                    src={found?.imageUrl}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  sm={12}
                  sx={{
                    backgroundColor: "#cfd8dc",
                    borderTopRightRadius: { md: "15px" },
                    borderBottomRightRadius: { md: "15px" },
                  }}
                >
                  <Box className={styles.contentColumn}>
                    <Box className={styles.header}>
                      <Typography
                        variant="h3"
                        color="initial"
                        className={styles.title}
                      >
                        {found?.title}
                      </Typography>
                    </Box>
                    <Box className={styles.body}>
                      <Box className={styles.rowWrapper}>
                        <Box className={styles.price}>Rs: {found?.price}</Box>
                        <Box className={styles.rating}>
                          {[1, 2, 3, 4, 5].map((v, i) => {
                            return found?.rating >= v ? (
                              <StarRoundedIcon
                                htmlColor="#ffea00"
                                style={{ fontSize: "inherit" }}
                              />
                            ) : (
                              <StarRoundedIcon
                                htmlColor="#bdbdbd"
                                style={{ fontSize: "inherit" }}
                              />
                            );
                          })}
                        </Box>
                      </Box>
                      <Box className={styles.description}>
                        <Typography variant="p">
                          {found?.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={styles.footer}>
                      <button onClick={addingToCart}>ADD TO CART</button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default Item;
