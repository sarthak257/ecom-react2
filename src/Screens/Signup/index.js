import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Link2, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  const navigate = useNavigate();
  const [registerObj, setRegisterObj] = useState();
  const [matchPassword, setMatchPassword] = useState({ err: false, msg: "" });
  const [error, setError] = useState({ err: false, code: "", msg: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setRegisterObj(data.get("email"));
    if (
      data.get("password") === data.get("confirmpassword") &&
      data.get("password").length > 2 &&
      data.get("name")?.length > 2
    ) {
      setMatchPassword({ err: false, msg: "" });
      createUserWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: data.get("name"),
          });

          toast.success("Register User & Login Successfully...");
          navigate(`/signin`);
          setError({ err: false, code: "", msg: "" });
          // ...
        })
        .catch((error) => {
          console.log("user error.code", error.code);
          console.log("user error.message", error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setError({ err: true, code: errorCode, msg: errorMessage });
        });
    } else {
      if (data.get("name")?.length < 2) {
        setMatchPassword({ err: false, msg: "Full name is required" });
      } else {
        setMatchPassword({ err: true, msg: "Password not matched" });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {error?.err && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error?.code}
              </Alert>
            )}
            {error?.err && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error?.msg}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  error={registerObj === ""}
                  helperText={registerObj === "" ? "email required" : " "}
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  error={registerObj === ""}
                  helperText={registerObj === "" ? "email required" : " "}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  error={matchPassword?.err}
                  helperText={matchPassword?.err ? matchPassword?.msg : " "}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  error={matchPassword?.err}
                  helperText={matchPassword?.err ? matchPassword?.msg : " "}
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link2 to="/signin">Already have an account? Sign in</Link2>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
