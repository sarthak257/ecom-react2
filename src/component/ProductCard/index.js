import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./ProductCard.module.sass";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  data,
  setUpdateProductData,
  setUpdateModalOpen,
  setDeleteModalOpen,
  modification,
}) => {
  const navigate = useNavigate();
  return (
    // <Link to={`item/${data?.id}`} className={styles.ancherTag}>
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#fff",
        padding: "10px",
        m: 1,
        boxShadow: "0 0 5px 0px #9e9e9e",
        borderRadius: "10px",
        // margin: { sm: "5px", md: "20px" },
      }}
    >
      <Grid
        item
        md={6}
        sm={12}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/item/${data?.key}`);
        }}
      >
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid item md={5}>
            <img
              src={data?.imageUrl}
              style={{ width: "100%", height: "auto" }}
              alt="img"
            />
          </Grid>
          <Grid item md={7} className={styles.gridAlignment}>
            <div>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {data?.title}
                {/* <input type="text" /> */}
              </Typography>
              <Typography variant="span">Rs {data?.price}</Typography>
            </div>
            <div>
              {[1, 2, 3, 4, 5].map((v, i) => {
                return data?.rating >= v ? (
                  <StarRoundedIcon htmlColor="#ffea00" key={i} />
                ) : (
                  <StarRoundedIcon htmlColor="#bdbdbd" key={i} />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} sm={12} className={styles.gridAlignment}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/item/${data?.key}`);
          }}
        >
          <Typography variant="p">{data?.description}</Typography>
        </div>
        <Box sx={{ display: modification ? "none" : "block" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <div className={styles.cardIconAlignment}>
                <EditRoundedIcon htmlColor="#43a047" />
              </div> */}

            <IconButton
              aria-label="edit"
              sx={{ margin: "0 5px" }}
              onClick={(e) => {
                e.stopPropagation();
                setUpdateModalOpen(true);
                setUpdateProductData(data);
              }}
            >
              <EditRoundedIcon htmlColor="#43a047" />
            </IconButton>
            <IconButton
              aria-label="delete"
              sx={{ margin: "0 5px", zIndex: 99 }}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModalOpen(true);
                setUpdateProductData(data);
              }}
            >
              <DeleteForeverRoundedIcon htmlColor="#ff1744" />
            </IconButton>
            {/* <div className={styles.cardIconAlignment}>
                <DeleteForeverRoundedIcon htmlColor="#ff1744" />
              </div> */}
          </div>
        </Box>
      </Grid>
    </Grid>
    // </Link>
  );
};

export default ProductCard;
