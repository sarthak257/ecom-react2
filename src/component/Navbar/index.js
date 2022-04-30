import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.userAuth);
  const cartsData = useSelector((state) => state.cartReducer);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1, zIndex: 999999 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fafafa", color: "#000" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "#0277bd",
              }}
              onClick={() => {
                navigate(`/`);
              }}
            >
              eCommerce
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Products</Typography>
                </MenuItem>
                <MenuItem
                  key={2}
                  onClick={() => {
                    handleCloseNavMenu();

                    navigate(`/add-product`);
                  }}
                >
                  <Typography textAlign="center" sx={{ display: "flex" }}>
                    <span>Add a Product</span>
                    <AddCircleRoundedIcon fill="#43a047" htmlColor="#43a047" />
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                color: "#0277bd",
              }}
              onClick={() => {
                navigate(`/`);
              }}
            >
              eCommerce
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key={1}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/`);
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Products
              </Button>
              <Button
                key={2}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/add-product`);
                }}
                sx={{
                  my: 2,
                  color: "black",
                  display: "flex",
                  margin: "auto 0",
                }}
              >
                <span>Add a Product</span>
                <AddCircleRoundedIcon fill="#43a047" htmlColor="#43a047" />
              </Button>
            </Box>

            <Box>
              <Typography sx={{ mr: 2 }}>
                <IconButton
                  aria-label="cart"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <StyledBadge
                    badgeContent={cartsData?.noOfCart}
                    color="primary"
                  >
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mr: 2 }}>
                {loginUser?.user?.displayName || "John Doe"}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="./avatar.jfif" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key={1}
                  onClick={() => {
                    handleCloseUserMenu();
                    dispatch(logout());
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Navbar;
