import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { Link as Link2, Navigate } from "react-router-dom";
import { signinUser } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

const Signin = () => {
  const dispatch = useDispatch();

  const signInUser = useSelector((state) => state.userAuth);
  const [errMsg, seterrMsg] = useState();
  const [err, setErr] = useState(false);
  console.log("signInUser", signInUser);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email").length < 5) {
      setErr(true);
      seterrMsg("Email is required");
    } else if (data.get("password").length < 3) {
      setErr(true);
      seterrMsg("Password is equired");
    } else if (!data.get("email").includes("@")) {
      setErr(true);
      seterrMsg("Enter Valid Email");
    } else {
      dispatch(
        signinUser({ email: data.get("email"), password: data.get("password") })
      );
      setErr(false);
    }
  };

  if (signInUser?.isAutorize) {
    return <Navigate to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {err && <Alert severity="error">{errMsg}</Alert>}
          {signInUser?.error && (
            <Alert severity="error">{signInUser?.msg}</Alert>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link2 to="/resetpassword">Forgot password?</Link2>
            </Grid>
            <Grid item>
              <Link2 to="/signup">Don't have an account? Sign Up</Link2>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
export default Signin;
