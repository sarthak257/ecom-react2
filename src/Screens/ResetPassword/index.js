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
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
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

const ResetPassword = () => {
  // const dispatch = useDispatch();

  const signInUser = useSelector((state) => state.userAuth);
  const [errMsg, seterrMsg] = useState();
  const [err, setErr] = useState(false);
  const [sended, setSended] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email").length < 5) {
      setErr(true);
      setSended(false);
      seterrMsg("Please Enter Email");
    } else {
      sendPasswordResetEmail(auth, data.get("email"))
        .then(() => {
          setErr(false);
          setSended(true);
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          setErr(true);
          setSended(false);
          seterrMsg(errorCode);
          // ..
        });
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {err && <Alert severity="error">{errMsg}</Alert>}
          {sended && (
            <Alert severity="success">Password reset email sent!</Alert>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link2 to="/signin">Signin</Link2>
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
export default ResetPassword;
