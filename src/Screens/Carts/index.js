import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import LoaderSync from "../../component/LoaderSync";
import Navbar from "../../component/Navbar";
import ProductCard from "../../component/ProductCard";
import styles from "./Carts.module.sass";
const Carts = () => {
  const cartsData = useSelector((state) => state.cartReducer);
  console.log("cartsData", cartsData);
  return (
    <>
      <div className={styles.itemWrapper}>
        <Navbar />
        <div className={styles.itemCardWrapper}>
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
            {cartsData?.loading ? (
              <LoaderSync />
            ) : (
              cartsData?.carts?.map((v, i) => {
                return (
                  <div key={v?.key}>
                    <ProductCard data={v} modification={true} />;
                  </div>
                );
              })
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default Carts;
