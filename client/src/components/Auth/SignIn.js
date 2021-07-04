import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import {
  FacebookIcon,
  TwitterIcon,
  GoogleIcon,
} from "../FederatedSigninIcons";
import DividerWithText from "../DividerWithText";
import { AuthContext } from "../../providers/AuthProvider";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(1), // TODO: this should depend on window.height
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: "100%", // fix IE 11 issue
    marginTop: theme.spacing(1),
    autocomplete: "off",
  },
  submit: {
    margin: theme.spacing(3, 0, 1, 0),
    color: "white",
    backgroundColor: theme.palette.success.main,
    textTransform: "none",
    fontSize: "1.5em",
  },
  submitFederatedSignInFacebook: {
    margin: theme.spacing(2, 0, 0, 0),
    backgroundColor: theme.palette.facebook,
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(5),
    fontSize: "1.2em",
  },
  submitFederatedSignInTwitter: {
    margin: theme.spacing(1, 0, 0, 0),
    backgroundColor: theme.palette.twitter,
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(5),
    fontSize: "1.2em",
  },
  submitFederatedSignInGoogle: {
    margin: theme.spacing(1, 0, 0, 0),
    backgroundColor: theme.palette.google,
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(5),
    fontSize: "1.2em",
  },
  textField: {
    color: "#333",
    backgroundColor: "#fff !important",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#444",
      backgroundColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
    },
  },
  startAdornment: {
    backgroundColor: "#eaedf0",
    height: "2.5rem",
    maxHeight: "3rem",
    marginLeft: -15,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRight: "1px solid #c5c5c5",
  },
  text: {
    fontSize: "1.1em",
  },
  link: {
    color: theme.palette.success.main,
    fontSize: "1.1em",
  },
  rememberMe: {
    marginLeft: theme.spacing(0.2),
    color: theme.palette.success.main,
  },
  rememberMeLabel: {
    fontSize: "0.875em",
  },
  forgotPassword: {
    fontSize: "1em",
    marginLeft: "auto",
    marginRight: theme.spacing(0.2),
    color: theme.palette.success.main,
  }
});
const useStyles = makeStyles((theme) => (styles(theme)));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(true); // TODO: get from user choice

  const signIn = (e) => {
    e.preventDefault();

    Auth.signIn({
      username: email,
      password,
    })
      .then((user) => {
        console.info('signin user:', auth);
        setAuth({isAuthenticated: true, user});
        if (!rememberMe) {
          localStorage.clear();
        }
        setEmail("");
        setPassword("");
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const federatedSignIn = (e, provider) => {
    e.preventDefault();

    Auth.federatedSignIn({
      provider,
    })
      .then((user) => {
        setEmail("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5">
              {"Sign in"}
            </Typography>
          </Grid>
        </Grid>

        <form className={classes.form} noValidate autoComplete="off">

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} ${classes.submitFederatedSignInFacebook}`}
            startIcon={<FacebookIcon />}
            onClick={(e) => federatedSignIn(e, 'Facebook')}
          >
            {"Sign in with Facebook"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} ${classes.submitFederatedSignInTwitter}`}
            startIcon={<TwitterIcon />}
            onClick={(e) => federatedSignIn(e, 'Twitter')}
          >
            {"Sign in with Twitter"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classes.submit} ${classes.submitFederatedSignInGoogle}`}
            startIcon={<GoogleIcon />}
            onClick={(e) => federatedSignIn(e, 'Google')}
          >
            {"Sign in with Google"}
          </Button>

          <DividerWithText> {"or"} </DividerWithText>

          <TextField
            required
            autoFocus
            autoComplete="false"
            variant="outlined"
            fullWidth
            id="email"
            //label={"Email"}
            size="small"
            className={classes.textField}
            placeholder={"Email"}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.startAdornment}
                  position="start"
                >
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            required
            autoComplete="false"
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            //label="Password"
            size="small"
            className={classes.textField}
            placeholder={"Password"}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.startAdornment}
                  position="start"
                >
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => signIn(e)}
          >
            {"Sign In"}
          </Button>

          <Grid container alignItems="center">
            <Grid className={classes.rememberMe}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={classes.rememberMe}
                    color="primary"
                    size="small"
                  />
                }
                _label={"Remember me"}
                label={
                  <Typography className={classes.rememberMeLabel}>
                    {"Remember me"}
                  </Typography>
                }
              />
            </Grid>
            <Grid className={classes.forgotPassword}>
              <Link href="/forgot-password" className={classes.forgotPassword}>
                {"Forgot Password?"}
              </Link>
            </Grid>
          </Grid>

          <DividerWithText></DividerWithText>

          <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
            <Grid item>
              <Typography className={classes.text}>
                {"Don't have an account?"} {" "}
              </Typography>
            </Grid>
            <Grid item>
              <Link href="/signup" className={classes.link}>
                {"Register Now!"}
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>

      {/*
      <Box mt={8}> {/* TODO: go to a footer * /}
        <Copyright />
      </Box>
      */}

    </Container>
  );
}

// const Copyright = () => {
//   return (
//     <Typography variant="body2" color="textSecondary" align="right">
//       {'Copyright © '} {new Date().getFullYear()}, {' '}
//       <Link color="inherit" href="https://material-ui.com/">
//         SistemiSolari
//       </Link>{' '}
//     </Typography>
//   );
// }

export default SignIn;
